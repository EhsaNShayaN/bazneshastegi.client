import {Component} from '@angular/core';
import {Validators} from '@angular/forms';
import {EssentialLoanRequest} from './essential-loan.model';
import {BaseFormComponent} from '../base-form-component';
import {GetRequestTypeConfig, GetRequestTypeConfigResponse} from '../../../core/models/GetRequestTypeConfigResponse';
import {CityBankLoanRequest} from '../city-bank-loan/city-bank-loan.model';
import {InsertRequest, InsertRequestComplementary} from '../pay-fraction-certificate/pay-fraction-certificate.model';
import {InsertResponse} from '../../../core/models/InsertResponse';
import {InsertComplementaryResponse} from '../../../core/models/InsertComplementaryResponse';

@Component({
  selector: 'app-essential-loan',
  templateUrl: './essential-loan.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class EssentialLoanComponent extends BaseFormComponent {
  columnsToDisplay = [
    {key: 'mainpersonFirstName', name: 'نام'},
    {key: 'mainpersonLastName', name: 'نام خانوادگی'},
    {key: 'facilityReceiverFullName', name: 'وام گیرنده'},
    {key: 'facilityGiverDesc', name: 'وام‌دهنده'},
    {key: 'facilityAmount', name: 'مبلغ وام'}
  ];
  columnsToDisplay0: string[] = this.columnsToDisplay.map(s => s.key);
  requestTypeConfig?: GetRequestTypeConfig;
  totalRemainedAmount: number = 0;
  showDescription: boolean = false;

  constructor() {
    super();
  }

  override createForm() {
    this.restApiService.getRequestTypeConfig(this.requestTypeID, null, null, null, null)
      .subscribe((a: GetRequestTypeConfigResponse) => {
        this.requestTypeConfig = a.data[0];
        this.form = this.fb.group({
          facilityAmount: [this.requestTypeConfig!.defaultAmount, [Validators.required]],
          defaultInstalementCount: [{value: this.requestTypeConfig?.defaultInstalementCount, disabled: true}, Validators.required],
          facilityInstalementAmount: [{value: null, disabled: false}, Validators.required],
          requestDescription: [''],
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
        this.calculateLoanInstallment(this.requestTypeConfig!.defaultAmount);
      });
    this.totalRemainedAmount = this.dataSource?.data.reduce((total, num) => total + (num.remainedAmount ?? 0), 0) ?? 0;
  }

  calculateLoanInstallment(principal: number) {
    const months = this.requestTypeConfig!.defaultInstalementCount ?? 36;
    const installment = Math.round(principal / months);
    this.form.get('facilityInstalementAmount')?.setValue(installment);
    this.showDescription = ((this.form.get('facilityAmount')?.value ?? 0) + this.totalRemainedAmount) > this.requestTypeConfig!.defaultAmount;
    return installment;
  }

  submit() {
    console.log(this.form.getRawValue());
    if (this.form.valid) {
      const request: EssentialLoanRequest = this.form.getRawValue();
      request.referralToCommittee = this.showDescription;
      console.log('📌 فرم وام ضروری ثبت شد:');
      console.log(request);
      const insert: InsertRequest = {
        personID: this.personInfo!.personID,
        nationalCode: this.personInfo!.personNationalCode,
        personFirstName: this.personInfo!.personFirstName,
        personLastName: this.personInfo!.personLastName,
        requestDate: new Date(),
        requestTypeID: this.requestTypeID,
        requestText: 'درخواست وام ضروری از طرف بازنشسته',
        insertUserID: 'baz-1',
        requestFrom: 2,
      };
      this.restApiService.insert(insert).subscribe((a: InsertResponse) => {
        if (a.isSuccess) {
          console.log(a);
          const insertComplementary: InsertRequestComplementary = {
            requestID: a.data.requestID,
            requestTypeID: this.requestTypeID,
            personID: this.personInfo!.personID,
            facilityAmount: request.facilityAmount,
            referralToCommittee: request.referralToCommittee,
            requestDescription: request.requestDescription,
          };
          this.restApiService.insertComplementary(insertComplementary).subscribe((b: InsertComplementaryResponse) => {
            console.log(b);
            if (b.isSuccess) {
              this.showDescription = false;
              if ((this.attachments.controls?.length ?? 0) > 0) {
                this.insertAttachments(a.data.requestID, a.data.requestNO);
              } else {
                this.showResult(a.data.requestNO);
              }
            } else {
              this.toaster.error(a.errors[0]?.errorMessage ?? 'خطای نامشخص', 'خطا', {});
            }
          });
        } else {
          this.toaster.error(a.errors[0]?.errorMessage ?? 'خطای نامشخص', 'خطا', {});
        }
      });
    } else {
      this.form.markAllAsTouched();
      console.log(this.findInvalidControls(this.form));
    }
  }

  installmentKeyUpEvent($event: KeyboardEvent) {
    this.calculateLoanInstallment(this.form.get('facilityAmount')?.value);
  }
}
