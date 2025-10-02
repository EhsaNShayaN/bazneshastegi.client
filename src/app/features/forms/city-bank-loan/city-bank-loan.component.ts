import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {CityBankLoanRequest} from './city-bank-loan.model';
import {BaseFormComponent} from '../base-form-component';

@Component({
  selector: 'app-city-bank-loan',
  templateUrl: './city-bank-loan.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class CityBankLoanComponent extends BaseFormComponent implements OnInit {
  constructor() {
    super();
  }

  override createForm() {
    this.form = this.fb.group({
      branchName: ['', Validators.required],
      requestedAmount: [null, [Validators.required, Validators.min(1000)]],
      installmentCount: [null, [Validators.required, Validators.min(1)]],
      lastInstallmentDate: [''],
      receivedDate: [''],
      receivedAmount: [null],
      remainingAmount: [null],
      description: [''],
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
  }

  ngOnInit() {
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
