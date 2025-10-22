import {Component} from '@angular/core';
import {Validators} from '@angular/forms';
import {EssentialLoanRequest} from './essential-loan.model';
import {BaseFormComponent} from '../base-form-component';
import {GetRequestTypeConfig, GetRequestTypeConfigResponse} from '../../../core/models/GetRequestTypeConfigResponse';

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
    this.restApiService.getRequestTypeConfig(this.requestTypeID, null, null, this.personInfo?.pensionaryStatusID ?? '', this.personInfo?.genderID ?? '')
      .subscribe((a: GetRequestTypeConfigResponse) => {
        this.requestTypeConfig = a.data[0];
        this.form = this.fb.group({
          facilityAmount: [this.requestTypeConfig!.defaultAmount, [Validators.required]],
          defaultInstalementCount: [this.requestTypeConfig?.defaultInstalementCount, Validators.required],
          facilityInstalementAmount: [{value: null, disabled: false}, Validators.required],
          description: [''],
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
    const annualRate = (this.requestTypeConfig!.defaultDiscountPercent ?? 12) / 100;
    const months = this.requestTypeConfig!.defaultInstalementCount ?? 36;
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
    this.showDescription = ((this.form.get('facilityAmount')?.value ?? 0) + this.totalRemainedAmount) > this.requestTypeConfig!.defaultAmount;
    return result;
  }

  submit() {
    if (this.form.valid) {
      const request: EssentialLoanRequest = this.form.value;
      console.log('📌 فرم وام ضروری ثبت شد:', request);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
