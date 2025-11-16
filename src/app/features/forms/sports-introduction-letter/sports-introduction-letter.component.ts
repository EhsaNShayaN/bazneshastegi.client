import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {BaseFormComponent} from '../base-form-component';
import {InsertRequest} from '../pay-fraction-certificate/pay-fraction-certificate.model';
import {SportsIntroductionLetterRequest} from './sports-introduction-letter.model';

@Component({
  selector: 'app-sports-introduction-letter',
  templateUrl: './sports-introduction-letter.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class SportsIntroductionLetterComponent extends BaseFormComponent implements OnInit {
  constructor() {
    super();
    this.getRelations();
  }

  ngOnInit() {
  }

  override createForm() {
    this.form = this.fb.group({
      ceremonyTypeLookupID: ['', Validators.required],
      introducedToLookupID: ['', Validators.required],
      facilityDiscountPercent: [{value: null, disabled: true}, Validators.required],
      ceremonyDate: [null, Validators.required],
      ceremonyGuestCount: [null],
      applicantRelationship: ['خودم', Validators.required],
      requestDescription: [null],
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

  submit() {
    this.relatedPersonIDError = this.form.get('applicantRelationship')?.value === 'وابستگانم' && !this.relatedPersonID;
    console.log(this.form.getRawValue());
    if (this.form.valid && !this.relatedPersonIDError) {
      const request: SportsIntroductionLetterRequest = this.form.getRawValue();
      console.log('📌 فرم معرفی نامه ورزشی ثبت شد:', request);
      const insert: InsertRequest = {
        personID: this.personInfo!.personID,
        nationalCode: this.personInfo!.personNationalCode,
        personFirstName: this.personInfo!.personFirstName,
        personLastName: this.personInfo!.personLastName,
        requestDate: new Date(),
        requestTypeID: this.requestTypeID,
        requestText: 'درخواست معرفی نامه آموزشی از طرف بازنشسته',
        insertUserID: 'baz-1',
        requestFrom: 2,
      };
      /*const insertComplementary: InsertRequestComplementary = {
        requestID: '',
        requestTypeID: this.requestTypeID,
        personID: this.personInfo!.personID,
        applicantRelationship: request.applicantRelationship,
        relatedPersonID: this.form.get('applicantRelationship')?.value === 'وابستگانم' ? this.relatedPersonID : '',
        facilityDiscountPercent: request.facilityDiscountPercent,
        ceremonyTypeLookupID: request.ceremonyTypeLookupID,
        ceremonyDate: request.ceremonyDate,
        ceremonyGuestCount: request.ceremonyGuestCount ?? 0,
        introducedToLookupID: request.introducedToLookupID,
        requestDescription: request.requestDescription,
      };
      this.send(insert, insertComplementary);*/
    } else {
      this.form.markAllAsTouched();
      console.log(this.findInvalidControls(this.form));
    }
  }
}
