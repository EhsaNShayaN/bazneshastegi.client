import {Component} from '@angular/core';
import {Validators} from '@angular/forms';
import {UrgentLoanRequest} from './urgent-loan.model';
import {BaseFormComponent} from '../base-form-component';

@Component({
  selector: 'app-urgent-loan',
  templateUrl: './urgent-loan.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class UrgentLoanComponent extends BaseFormComponent {
  constructor() {
    super();
  }

  override createForm() {
    this.form = this.fb.group({
      requestedAmount: [null, [Validators.required, Validators.min(1000)]],
      installmentCount: [null, [Validators.required, Validators.min(1)]],
      receivedDate: [''],
      receivedAmount: [null],
      remainingAmount: [null],
      lastInstallmentDate: [''],
      installmentAmount: [null],
      description: [''],
      attachments: this.fb.array(this.requestTypes.map(s => this.fb.group({obj: s, type: s.lookupName, uploaded: [false]}))),
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
