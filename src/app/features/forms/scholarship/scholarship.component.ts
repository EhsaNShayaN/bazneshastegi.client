import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScholarshipRequest } from './scholarship.model';

@Component({
  selector: 'app-scholarship',
  templateUrl: './scholarship.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class ScholarshipComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      relation: ['', Validators.required],
      grade: ['', Validators.required],
      scholarshipAmount: [null, [Validators.required, Validators.min(1000)]],
      requestType: ['', Validators.required],
      dependents: this.fb.array([]),
      attachments: this.fb.array([
        this.fb.group({ type: 'کپی شناسنامه', uploaded: [false] }),
        this.fb.group({ type: 'کپی کارت ملی', uploaded: [false] })
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
        grade: ['', Validators.required],
        scholarshipAmount: [null],
        dateReceived: ['']
      })
    );
  }

  submit() {
    if (this.form.valid) {
      const request: ScholarshipRequest = this.form.value;
      console.log('📌 فرم جایزه تحصیلی ثبت شد:', request);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
