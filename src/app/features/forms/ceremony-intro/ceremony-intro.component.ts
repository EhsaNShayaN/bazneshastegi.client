import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CeremonyIntroRequest} from './ceremony-intro.model';

@Component({
  selector: 'app-ceremony-intro',
  templateUrl: './ceremony-intro.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class CeremonyIntroComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      ceremonyType: ['', Validators.required],
      introduceTo: ['', Validators.required],
      discountPercent: [null],
      ceremonyDate: ['', Validators.required],
      inviteesCount: [null],
      forWhom: ['self', Validators.required],
      dependents: this.fb.array([]),
      attachments: this.fb.array([
        this.fb.group({type: 'کپی شناسنامه', uploaded: [false]}),
        this.fb.group({type: 'کپی گواهی بهزیستی', uploaded: [false]})
      ])
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
