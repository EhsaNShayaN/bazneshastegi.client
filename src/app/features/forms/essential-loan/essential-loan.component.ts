import {Component} from '@angular/core';
import {Validators} from '@angular/forms';
import {EssentialLoanRequest} from './essential-loan.model';
import {BaseFormComponent} from '../base-form-component';
import {GetRequestTypeConfigResponse, RequestTypeConfigInfo} from '../../../core/models/GetRequestTypeConfigResponse';
import {InsertRequest, InsertRequestComplementary} from '../pay-fraction-certificate/pay-fraction-certificate.model';

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
  requestTypeConfig?: RequestTypeConfigInfo;
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
      const insertComplementary: InsertRequestComplementary = {
        requestID: '',
        requestTypeID: this.requestTypeID,
        personID: this.personInfo!.personID,
        facilityAmount: request.facilityAmount,
        referralToCommittee: request.referralToCommittee,
        requestDescription: request.requestDescription,
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
