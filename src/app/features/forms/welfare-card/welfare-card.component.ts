import {Component} from '@angular/core';
import {Validators} from '@angular/forms';
import {WelfareCardRequest} from './welfare-card.model';
import {BaseFormComponent} from '../base-form-component';

@Component({
  selector: 'app-welfare-card',
  templateUrl: './welfare-card.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class WelfareCardComponent extends BaseFormComponent {
  constructor() {
    super();
  }

  override createForm(): void {
    this.form = this.fb.group({
      cardNumber: [''],
      issueType: ['', Validators.required],
      issueDate: [''],
      previousCardNumber: [''],
      description: [''],
      deliveryMethod: ['', Validators.required],
      receiverName: [''],
      issueCost: [150000, Validators.required],
      postCost: [250000],
      attachments: this.fb.array(this.requestTypes.map(s => this.fb.group({type: s.lookupName, uploaded: [false]}))),
    });
  }

  submit() {
    if (this.form.valid) {
      const request: WelfareCardRequest = this.form.value;
      console.log('📌 فرم کارت رفاهی ثبت شد:', request);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
