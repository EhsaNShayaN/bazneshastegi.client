import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {SalaryCertificate} from './salary-certificate.model';
import {InsertRequest, InsertRequestComplementary} from '../pay-fraction-certificate/pay-fraction-certificate.model';
import {BaseFormComponent} from '../base-form-component';

@Component({
  selector: 'app-salary-certificate',
  templateUrl: './salary-certificate.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class SalaryCertificateComponent extends BaseFormComponent implements OnInit {
  columnsToDisplay = [
    {key: 'mainpersonFirstName', name: 'نام'},
    {key: 'mainpersonLastName', name: 'نام خانوادگی'},
    {key: 'facilityReceiverFullName', name: 'وام گیرنده'},
    {key: 'facilityGiverDesc', name: 'وام‌دهنده'},
    {key: 'facilityAmount', name: 'مبلغ وام'}
  ];
  currentColumnsToDisplay: string[] = this.columnsToDisplay.map(s => s.key);
  retirementDate: string = '';

  constructor() {
    super();
  }

  override createForm() {
    this.retirementDate = this.convertToPersianDate(this.personInfo?.retirementDate?.split('T')[0] ?? '');
    this.form = this.fb.group({
      facilityGiverDesc: ['', Validators.required],
      includeSalary: [false],
      includeHistory: [false],
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
    console.log(this.form.getRawValue());
    if (this.form.valid) {
      const request: SalaryCertificate = this.form.getRawValue();
      console.log('📌 فرم گواهی کسر از حقوق ثبت شد:');
      console.log(request);
      const insert: InsertRequest = {
        nationalCode: '', personFirstName: '', personLastName: '',
        personID: this.personInfo!.personID,
        requestDate: new Date(),
        requestTypeID: this.requestTypeID,
        requestText: 'گواهی کسر از حقوق از طرف بازنشسته',
        insertUserID: 'baz-1',
        requestFrom: 2
      };
      const insertComplementary: InsertRequestComplementary = {
        requestID: '',
        requestTypeID: this.requestTypeID,
        personID: this.personInfo!.personID,
        insertPayAmountInCertificate: request.includeSalary,
        insertDurationInCertificate: request.includeHistory,
        facilityGiverDesc: request.facilityGiverDesc,
      };
      this.send(insert, insertComplementary);
    } else {
      this.form.markAllAsTouched();
      console.log(this.findInvalidControls(this.form));
    }
  }
}
