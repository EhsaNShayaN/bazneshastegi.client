import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {HealthBookletRequest} from './health-booklet.model';
import {BaseFormComponent} from '../base-form-component';

@Component({
  selector: 'app-health-booklet',
  templateUrl: './health-booklet.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class HealthBookletComponent extends BaseFormComponent implements OnInit {
  uploadedFileName: string | null = null;

  constructor() {
    super();
  }

  override createForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      relation: ['', Validators.required],
      underSupport: [false, Validators.required],
      requestType: ['', Validators.required],
      deliveryMethod: ['', Validators.required],
      deliveryCost: [250000],
      photo: [null],
      attachments: this.fb.array(this.requestTypes.map(s => this.fb.group({obj: s, type: s.lookupName, uploaded: [false]}))),
    });
  }

  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {
      const request: HealthBookletRequest = this.form.value;
      console.log('📌 فرم دفترچه درمانی ثبت شد:', request);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
