import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {SalaryCertificate} from './salary-certificate.model';
import {InsertComplementaryResponse} from '../../../core/models/InsertComplementaryResponse';
import {InsertRequest, InsertRequestComplementary, PayFractionCertificate} from '../pay-fraction-certificate/pay-fraction-certificate.model';
import {InsertResponse} from '../../../core/models/InsertResponse';
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
  columnsToDisplay0: string[] = this.columnsToDisplay.map(s => s.key);
  retirementDate: string = '';

  constructor() {
    super();
  }

  override createForm() {
    this.retirementDate = this.convertToPersianDate(this.personInfo?.retirementDate?.split('T')[0] ?? '');
    this.form = this.fb.group({
      organization: ['', Validators.required],
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
      this.restApiService.insert(insert).subscribe((a: InsertResponse) => {
        if (a.isSuccess) {
          console.log(a);
          const insertComplementary: InsertRequestComplementary = {
            requestID: a.data.requestID,
            requestTypeID: this.requestTypeID,
            personID: this.personInfo!.personID,
            insertPayAmountInCertificate: request.includeSalary,
            insertDurationInCertificate: request.includeHistory,
          };
          this.restApiService.insertComplementary(insertComplementary).subscribe((b: InsertComplementaryResponse) => {
            console.log(b);
            if (b.isSuccess) {
              if ((this.attachments.controls?.length ?? 0) > 0) {
                this.insertAttachments(a.data.requestID, a.data.requestNO);
              } else {
                this.showResult(a.data.requestNO);
              }
            } else {
              this.toaster.error(a.errors[0]?.errorMessage ?? 'خطای نامشخص', 'خطا', {});
            }
          });
        } else {
          this.toaster.error(a.errors[0]?.errorMessage ?? 'خطای نامشخص', 'خطا', {});
        }
      });
    } else {
      this.form.markAllAsTouched();
      console.log(this.findInvalidControls(this.form));
    }
  }
}
