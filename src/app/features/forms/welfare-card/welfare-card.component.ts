import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WelfareCardRequest} from './welfare-card.model';

@Component({
  selector: 'app-welfare-card',
  templateUrl: './welfare-card.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class WelfareCardComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
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
      attachments: this.fb.array([
        this.fb.group({type: 'کپی شناسنامه', uploaded: [false]}),
        this.fb.group({type: 'کپی کارت ملی', uploaded: [false]})
      ])
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
