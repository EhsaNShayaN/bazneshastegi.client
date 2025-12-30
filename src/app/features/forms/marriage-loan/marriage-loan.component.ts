import {Component} from '@angular/core';
import {Validators} from '@angular/forms';
import {BaseFormComponent} from '../base-form-component';
import {GetRequestTypeConfigResponse, RequestTypeConfigInfo} from '../../../core/models/GetRequestTypeConfigResponse';
import {InsertRequest} from '../pay-fraction-certificate/pay-fraction-certificate.model';
import {MarriageLoanRequest} from './marriage-loan.model';

@Component({
  selector: 'app-marriage-loan',
  templateUrl: './marriage-loan.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class MarriageLoanComponent extends BaseFormComponent {
  columnsToDisplay = [
    {key: 'mainPersonFirstName', name: 'نام'},
    {key: 'mainPersonLastName', name: 'نام خانوادگی'},
    {key: 'facilityReceiverFullName', name: 'وام گیرنده'},
    {key: 'facilityGiverDesc', name: 'وام‌دهنده'},
    {key: 'facilityAmount', name: 'مبلغ وام'}
  ];
  columnsToDisplay0: string[] = this.columnsToDisplay.map(s => s.key);
  requestTypeConfig?: RequestTypeConfigInfo;
  totalRemainedAmount: number = 0;

  constructor() {
    super();
    this.getRelations();
  }

  override createForm() {
    this.restApiService.getRequestTypeConfig(this.requestTypeID, null, null, null, null)
      .subscribe((a: GetRequestTypeConfigResponse) => {
        this.requestTypeConfig = a.data[0];
        this.form = this.fb.group({
          facilityAmount: [{value: this.requestTypeConfig?.defaultAmount, disabled: true}, Validators.required],
          profitOrDiscountPercent: [{value: this.requestTypeConfig?.profitOrDiscountPercent, disabled: true}, Validators.required],
          facilityInstalementCount: [{value: this.requestTypeConfig?.defaultInstalementCount, disabled: true}, Validators.required],
          facilityInstalementAmount: [{value: null, disabled: true}, Validators.required],
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
    const months = this.requestTypeConfig!.profitOrDiscountPercent ?? 36;
    const installment = Math.round(principal / months);
    this.form.get('facilityInstalementAmount')?.setValue(installment);
    return installment;
  }

  installmentKeyUpEvent($event: KeyboardEvent) {
    this.calculateLoanInstallment(this.form.get('facilityAmount')?.value);
  }

  submit() {
    console.log(this.form.getRawValue());
    if (this.form.valid) {
      if (!this.relatedPersonID) {
        this.relatedPersonIDError = true;
        return;
      }
      const request: MarriageLoanRequest = this.form.getRawValue();
      console.log('📌 فرم وام ازدواج ثبت شد:', request);
      const insert: InsertRequest = {
        personID: this.personInfo!.personID,
        nationalCode: this.personInfo!.personNationalCode,
        personFirstName: this.personInfo!.personFirstName,
        personLastName: this.personInfo!.personLastName,
        requestDate: new Date(),
        requestTypeID: this.requestTypeID,
        requestText: 'از کار افتادگی از طرف بازنشسته',
        insertUserID: 'baz-1',
        requestFrom: 2,
      };
      this.insert(insert).then(insertResponse => {
        if (insertResponse) {
          const model: MarriageLoanRequest = {
            requestID: insertResponse.data.requestID,
            requestTypeID: this.requestTypeID,
            requestComplementaryID: '',
            relatedPersonID: this.relatedPersonID,
            requestDescription: request.requestDescription,
            facilityAmount: request.facilityAmount,
            facilityInstalementCount: request.facilityInstalementCount,
            profitOrDiscountPercent: request.profitOrDiscountPercent,
            facilityInstalementAmount: request.facilityInstalementAmount,
          };
          this.call<MarriageLoanRequest>(
            insertResponse.data,
            this.restApiService.insertRequestComplementary_MarriageLoan(model));
        }
      });
    } else {
      this.form.markAllAsTouched();
      console.log(this.findInvalidControls(this.form));
    }
  }
}
