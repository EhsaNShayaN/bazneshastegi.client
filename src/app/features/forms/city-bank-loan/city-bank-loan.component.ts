import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {BaseFormComponent} from '../base-form-component';
import {InsertRequest, InsertRequestComplementary} from '../pay-fraction-certificate/pay-fraction-certificate.model';
import {GetRequestTypeConfigResponse, RequestTypeConfigInfo} from '../../../core/models/GetRequestTypeConfigResponse';
import {CityBankLoanRequest} from './city-bank-loan.model';
import {SelectItem} from '../../../shared/components/custom-select/custom-select.component';
import {LookUpDataResponse} from '../../../core/models/LookUpResponse';

@Component({
  selector: 'app-city-bank-loan',
  templateUrl: './city-bank-loan.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class CityBankLoanComponent extends BaseFormComponent implements OnInit {
  columnsToDisplay = [
    {key: 'confirmDate', name: 'تاریخ دریافت'},
    {key: 'facilityAmount', name: 'مبلغ دریافتی'},
    {key: 'remainedAmount', name: 'مانده'},
    {key: 'a', name: 'تاریخ آخرین قسط'},
  ];
  columnsToDisplay0: string[] = this.columnsToDisplay.map(s => s.key);
  requestTypeConfig?: RequestTypeConfigInfo;
  totalRemainedAmount: number = 0;
  showDescription: boolean = false;
  lenders: SelectItem[] = [];
  branches: SelectItem[] = [];
  facilityGiverLookupId: string = '';
  cityBankLookupId: string = '8002';

  constructor() {
    super();
  }

  ngOnInit() {
    this.restApiService.getLookupData('Bank', '').subscribe((a: LookUpDataResponse) => {
      this.lenders = a.data.filter(s => s.lookUpID === this.cityBankLookupId).map(s => ({
        id: s.lookUpID,
        name: s.lookUpName,
      }));
      this.lenderChanged(this.cityBankLookupId);
    });
  }

  override createForm() {
    this.restApiService.getRequestTypeConfig(this.requestTypeID, null, null, this.personInfo?.pensionaryStatusID ?? '', this.personInfo?.genderID ?? '')
      .subscribe((a: GetRequestTypeConfigResponse) => {
        this.requestTypeConfig = a.data[0];
        console.log('requestTypeConfig', this.requestTypeConfig);
        this.form = this.fb.group({
          lenderName: [this.cityBankLookupId, Validators.required],
          branchName: ['', Validators.required],
          branchCode: ['', Validators.required],
          facilityAmount: [this.requestTypeConfig?.defaultAmount, [Validators.required]],
          facilityInstalementAmount: [{value: '', disabled: true}, Validators.required],
          guarantorCost: [{value: this.requestTypeConfig?.guarantorCost, disabled: true}, Validators.required],
          requestDescription: [''],
          needGuarantor: [false, Validators.required],
          attachments: this.fb.array(
            this.requestTypes.map(s =>
              this.fb.group({
                obj: [s],
                type: [s.lookupName],
                file: [null, s.mandantory ? Validators.required : null],
                uploaded: [false]
              })
            )
          ),
        });
        this.calculateLoanInstallment(this.requestTypeConfig?.defaultAmount);
      });
    this.totalRemainedAmount = this.dataSource?.data.reduce((total, num) => total + (num.remainedAmount ?? 0), 0) ?? 0;
  }

  calculateLoanInstallment(principal: number) {
    const annualRate = (this.requestTypeConfig?.defaultDiscountPercent ?? 12) / 100;
    const months = this.requestTypeConfig?.defaultInstalementCount ?? 36;
    const monthlyRate = annualRate / 12; // نرخ ماهانه
    const installment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = installment * months;
    const totalInterest = totalPayment - principal;

    const result = {
      installment: Math.round(installment),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest)
    };
    this.form.get('facilityInstalementAmount')?.setValue(result.installment);
    this.showDescription = ((this.form.get('facilityAmount')?.value ?? 0) + this.totalRemainedAmount) > (this.requestTypeConfig?.defaultAmount ?? 0);
    return result;
  }

  lenderChanged($event: any) {
    if ($event) {
      this.facilityGiverLookupId = $event;
      this.restApiService.getLookupData('BankBranch', this.facilityGiverLookupId).subscribe((a: LookUpDataResponse) => {
        this.branches = a.data.map(s => ({
          id: s.lookUpID,
          name: s.lookUpName,
        }));
      });
    }
  }

  branchChanged($event: any): void {
    if ($event) {
      this.facilityGiverLookupId = $event;
    }
  }

  submit() {
    console.log(this.form.getRawValue());
    if (this.form.valid) {
      const request: CityBankLoanRequest = this.form.getRawValue();
      request.facilityInstalementCount = this.requestTypeConfig?.defaultInstalementCount ?? 0;
      request.referralToCommittee = this.showDescription;
      console.log('📌 فرم وام بانک شهر ثبت شد:');
      console.log(request);
      const insert: InsertRequest = {
        personID: this.personInfo!.personID,
        nationalCode: this.personInfo!.personNationalCode,
        personFirstName: this.personInfo!.personFirstName,
        personLastName: this.personInfo!.personLastName,
        requestDate: new Date(),
        requestTypeID: this.requestTypeID,
        requestText: 'درخواست وام بانک شهر از طرف بازنشسته',
        insertUserID: 'baz-1',
        requestFrom: 2,
      };
      const insertComplementary: InsertRequestComplementary = {
        requestID: '',
        requestTypeID: this.requestTypeID,
        personID: this.personInfo!.personID,
        facilityGiverDesc: request.branchCode,
        facilityAmount: request.facilityAmount,
        facilityInstalementCount: request.facilityInstalementCount,
        needGuarantor: request.needGuarantor,
        referralToCommittee: request.referralToCommittee,
        requestDescription: request.requestDescription,
        facilityGiverLookupID: this.facilityGiverLookupId
      };
      this.send(insert, insertComplementary);
    } else {
      this.form.markAllAsTouched();
      console.log(this.findInvalidControls(this.form));
    }
  }

  installmentKeyUpEvent($event: KeyboardEvent) {
    this.calculateLoanInstallment(this.form.get('facilityAmount')?.value);
  }
}
