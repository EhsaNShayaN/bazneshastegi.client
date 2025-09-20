import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CityBankLoanRequest} from './city-bank-loan.model';

@Component({
  selector: 'app-city-bank-loan',
  templateUrl: './city-bank-loan.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class CityBankLoanComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      branchName: ['', Validators.required],
      requestedAmount: [null, [Validators.required, Validators.min(1000)]],
      installmentCount: [null, [Validators.required, Validators.min(1)]],
      lastInstallmentDate: [''],
      receivedDate: [''],
      receivedAmount: [null],
      remainingAmount: [null],
      description: [''],
      needGuarantor: [false, Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      const request: CityBankLoanRequest = this.form.value;
      console.log('📌 فرم وام بانک شهر ثبت شد:', request);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
