import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UrgentLoanRequest} from './urgent-loan.model';

@Component({
  selector: 'app-urgent-loan',
  templateUrl: './urgent-loan.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class UrgentLoanComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      requestedAmount: [null, [Validators.required, Validators.min(1000)]],
      installmentCount: [null, [Validators.required, Validators.min(1)]],
      receivedDate: [''],
      receivedAmount: [null],
      remainingAmount: [null],
      lastInstallmentDate: [''],
      installmentAmount: [null],
      description: [''],
      attachments: this.fb.array([
        this.fb.group({type: 'کپی شناسنامه', uploaded: [false]}),
        this.fb.group({type: 'کپی کارت ملی', uploaded: [false]})
      ])
    });
  }

  submit() {
    if (this.form.valid) {
      const request: UrgentLoanRequest = this.form.value;
      console.log('📌 فرم وام ضروری ثبت شد:', request);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
