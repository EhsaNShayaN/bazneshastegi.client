import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SalaryCertificate} from './salary-certificate.model';
import {InsertComplementaryResponse} from '../../../core/models/InsertComplementaryResponse';
import {CustomConstants} from '../../../core/constants/custom.constants';
import {InsertRequest, InsertRequestComplementary} from '../pay-fraction-certificate/pay-fraction-certificate.model';
import {InsertResponse} from '../../../core/models/InsertResponse';
import {BaseFormComponent} from '../base-form-component';
import {CurrencyFormatterPipe} from '../../../core/pipes/currency-formatter.pipe';

@Component({
  selector: 'app-salary-certificate',
  templateUrl: './salary-certificate.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class SalaryCertificateComponent extends BaseFormComponent {
  form: FormGroup;

  constructor(private currencyFormatter: CurrencyFormatterPipe,
              private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      organization: ['', Validators.required],
      payAmount: [{value: null, disabled: true}, [Validators.required, Validators.min(1000)]],
      retirementDate: [{value: null, disabled: true}],
      retiredRealDuration: [{value: null, disabled: true}],
      includeSalary: [false],
      includeHistory: [false],
    });
    this.sub2 = this.personInfoSubject.subscribe(data => {
      if (data) {
        this.form.get('payAmount')?.setValue(this.currencyFormatter.transform(this.personInfo!.payAmount));
        this.form.get('retirementDate')?.setValue(this.personInfo!.retirementDate.substring(0, 10));
        this.form.get('retiredRealDuration')?.setValue(this.personInfo!.retiredRealDurationYEAR);
      }
    });
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
            applicantBirthDate: this.personInfo!.personBirthDate,
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
