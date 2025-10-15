import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {BaseFormComponent} from '../base-form-component';
import {InsertRequest, InsertRequestComplementary, PayFractionCertificate} from '../pay-fraction-certificate/pay-fraction-certificate.model';
import {InsertResponse} from '../../../core/models/InsertResponse';
import {InsertComplementaryResponse} from '../../../core/models/InsertComplementaryResponse';

@Component({
  selector: 'app-city-bank-loan',
  templateUrl: './city-bank-loan.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class CityBankLoanComponent extends BaseFormComponent implements OnInit {
  columnsToDisplay = [
    {key: 'mainpersonFirstName', name: 'نام'},
    {key: 'mainpersonLastName', name: 'نام خانوادگی'},
    {key: 'relation', name: 'نسبت'},
    {key: 'grade', name: 'مقطع تحصیلی'},
    {key: 'facilityAmount', name: 'مبلغ تسهیلات دریافتی'},
    {key: 'facilityDate', name: 'تاریخ دریافت'},
  ];
  columnsToDisplay0: string[] = this.columnsToDisplay.map(s => s.key);

  constructor() {
    super();
  }

  override createForm() {
    this.form = this.fb.group({
      branchName: ['', Validators.required],
      branchCode: ['', Validators.required],
      requestedAmount: [null, [Validators.required, Validators.min(1000)]],
      installmentCount: [null, [Validators.required, Validators.min(1)]],
      installmentAmount: [''],
      profit: [''],
      guaranty: [null],
      description: [''],
      needGuarantor: [false, Validators.required],
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
      const request: PayFractionCertificate = this.form.getRawValue();
      console.log('📌 فرم گواهی کسر از حقوق ثبت شد:');
      console.log(request);
      const insert: InsertRequest = {
        personID: this.personInfo!.personID,
        nationalCode: request.borrower.nationalCode,
        personFirstName: request.borrower.firstName,
        personLastName: request.borrower.lastName,
        requestDate: new Date(),
        requestTypeID: this.requestTypeID,
        requestText: 'گواهی کسر از حقوق از طرف بازنشسته',
        insertUserID: 'baz-1',
        requestFrom: 2,
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
            applicantNationalCode: request.borrower.nationalCode,
            applicantBirthDate: this.datePipe.transform(request.borrower.birthDate, 'yyyy-MM-dd') ?? '',
            applicantFirstName: request.borrower.firstName,
            applicantLastName: request.borrower.lastName,
            applicantRelationship: request.borrower.relation,
            facilityAmount: request.lender.loanAmount,
            facilityInstalementCount: request.lender.installmentCount,
            //facilityGiverLookupID: this.facilityGiverLookupId
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
