import {Component} from '@angular/core';
import {FormArray, Validators} from '@angular/forms';
import {CeremonyIntroRequest} from './ceremony-intro.model';
import {BaseFormComponent} from '../base-form-component';

@Component({
  selector: 'app-ceremony-intro',
  templateUrl: './ceremony-intro.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class CeremonyIntroComponent extends BaseFormComponent {
  constructor() {
    super();
  }

  override createForm() {
    this.form = this.fb.group({
      ceremonyType: ['', Validators.required],
      introduceTo: ['', Validators.required],
      discountPercent: [null],
      ceremonyDate: ['', Validators.required],
      inviteesCount: [null],
      forWhom: ['self', Validators.required],
      dependents: this.fb.array([]),
      attachments: this.fb.array(this.requestTypes.map(s => this.fb.group({type: s.lookupName, uploaded: [false]}))),
    });
  }

  get dependents() {
    return this.form.get('dependents') as FormArray;
  }

  addDependent() {
    this.dependents.push(
      this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        relation: ['', Validators.required],
        underSupport: [false]
      })
    );
  }

  submit() {
    if (this.form.valid) {
      const request: CeremonyIntroRequest = this.form.value;
      console.log('📌 فرم مراسم معرفی‌نامه ثبت شد:', request);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
