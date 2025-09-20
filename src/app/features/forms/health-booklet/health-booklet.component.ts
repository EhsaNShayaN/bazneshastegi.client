import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HealthBookletRequest } from './health-booklet.model';

@Component({
  selector: 'app-health-booklet',
  templateUrl: './health-booklet.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class HealthBookletComponent {
  form: FormGroup;
  uploadedFileName: string | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      relation: ['', Validators.required],
      underSupport: [false, Validators.required],
      requestType: ['', Validators.required],
      deliveryMethod: ['', Validators.required],
      deliveryCost: [250000],
      photo: [null],
      attachments: this.fb.array([
        this.fb.group({ type: 'کپی شناسنامه', uploaded: [false] }),
        this.fb.group({ type: 'کپی کارت ملی', uploaded: [false] })
      ])
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadedFileName = file.name;
      this.form.patchValue({ photo: file });
    }
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
