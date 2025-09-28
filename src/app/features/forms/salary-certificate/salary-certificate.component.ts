import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {SalaryCertificate} from './salary-certificate.model';
import {InsertComplementaryResponse} from '../../../core/models/InsertComplementaryResponse';
import {CustomConstants} from '../../../core/constants/custom.constants';
import {InsertRequest, InsertRequestComplementary} from '../pay-fraction-certificate/pay-fraction-certificate.model';
import {InsertResponse} from '../../../core/models/InsertResponse';
import {BaseFormComponent} from '../base-form-component';

@Component({
  selector: 'app-salary-certificate',
  templateUrl: './salary-certificate.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class SalaryCertificateComponent extends BaseFormComponent implements OnInit {

  constructor() {
    super();
  }

  override createForm() {
    this.form = this.fb.group({
      organization: ['', Validators.required],
      payAmount: [{value: this.personInfo?.payAmount, disabled: true}, [Validators.required, Validators.min(1000)]],
      retirementDate: [{value: this.personInfo?.retirementDate.substring(0, 10), disabled: true}],
      retiredRealDuration: [{value: this.personInfo?.retiredRealDurationYEAR, disabled: true}],
      includeSalary: [false],
      includeHistory: [false],
      attachments: this.fb.array(this.requestTypes.map(s => this.fb.group({obj: s, type: s.lookupName, uploaded: [false]}))),
    });
  }

  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {
      const request: SalaryCertificate = this.form.value;
      console.log('📌 فرم گواهی حقوق ثبت شد:');
      console.log(request);
      const insert: InsertRequest = {
        personID: this.personInfo!.personID,
        nationalCode: this.personInfo!.personNationalCode,
        personFirstName: this.personInfo!.personFirstName,
        personLastName: this.personInfo!.personLastName,
        requestDate: new Date(),
        requestTypeID: this.requestTypeID,
        requestText: 'گواهی حقوق از طرف بازنشسته',
        insertUserID: 'baz-1',
        requestFrom: 2,
      };
      this.restApiService.insert(insert).subscribe((c: InsertResponse) => {
        if (c.isSuccess) {
          console.log(c);
          const insertComplementary: InsertRequestComplementary = {
            requestID: c.data.requestID,
            personID: this.personInfo!.personID,
            ceremonyDate: new Date(),
            insertPayAmountInCertificate: request.includeSalary,
            insertDurationInCertificate: request.includeHistory,
            applicantNationalCode: this.personInfo!.personNationalCode,
            applicantFirstName: this.personInfo!.personFirstName,
            applicantLastName: this.personInfo!.personLastName,
            applicantBirthDate: this.toGeorgianDate(this.personInfo!.personBirthDate),
            facilityGiverDesc: request.organization
          };
          this.restApiService.insertComplementary(insertComplementary).subscribe((d: InsertComplementaryResponse) => {
            console.log(d);
            if (d.isSuccess) {
              this.toaster.success(CustomConstants.THE_OPERATION_WAS_SUCCESSFUL, '', {});
              this.form.reset();
              this.form.markAsPristine();
              this.form.markAsUntouched();
            } else {
              this.toaster.error(c.errors[0]?.errorMessage ?? 'خطای نامشخص', 'خطا', {});
            }
          });
        } else {
          this.toaster.error(c.errors[0]?.errorMessage ?? 'خطای نامشخص', 'خطا', {});
        }
      });
    } else {
      this.form.markAllAsTouched();
      console.log(this.findInvalidControls(this.form));
    }
  }
}
