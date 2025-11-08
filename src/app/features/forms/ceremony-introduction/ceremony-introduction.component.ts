import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {CeremonyIntroRequest} from './ceremony-introduction.model';
import {BaseFormComponent} from '../base-form-component';
import {LookUpDataResponse} from '../../../core/models/LookUpResponse';
import {SelectItem} from '../../../shared/components/custom-select/custom-select.component';
import {MatSelectChange} from '@angular/material/select';
import {GetRequestTypeConfigResponse} from '../../../core/models/GetRequestTypeConfigResponse';
import {InsertRequest, InsertRequestComplementary} from '../pay-fraction-certificate/pay-fraction-certificate.model';

@Component({
  selector: 'app-ceremony-introduction',
  templateUrl: './ceremony-introduction.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class CeremonyIntroductionComponent extends BaseFormComponent implements OnInit {
  ceremonyTypes: SelectItem[] = [];
  places: SelectItem[] = [];

  constructor() {
    super();
    this.getRelations();
  }

  ngOnInit() {
    this.restApiService.getLookupData('CeremonyType', '').subscribe((a: LookUpDataResponse) => {
      this.ceremonyTypes = a.data.map(s => ({
        id: s.lookUpID,
        name: s.lookUpName,
      }));
    });
    this.restApiService.getLookupData('IntroducedTo', '').subscribe((a: LookUpDataResponse) => {
      this.places = a.data.map(s => ({
        id: s.lookUpID,
        name: s.lookUpName,
      }));
    });
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

  dateChanged(dateInput: HTMLInputElement) {
    const date = this.form.get('ceremonyDate')?.value;
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  submit() {
    this.relatedPersonIDError = this.form.get('applicantRelationship')?.value === 'وابستگانم' && !this.relatedPersonID;
    console.log(this.form.getRawValue());
    if (this.form.valid && !this.relatedPersonIDError) {
      const request: CeremonyIntroRequest = this.form.getRawValue();
      console.log('📌 فرم مراسم معرفی‌نامه ثبت شد:', request);
      const insert: InsertRequest = {
        personID: this.personInfo!.personID,
        nationalCode: this.personInfo!.personNationalCode,
        personFirstName: this.personInfo!.personFirstName,
        personLastName: this.personInfo!.personLastName,
        requestDate: new Date(),
        requestTypeID: this.requestTypeID,
        requestText: 'درخواست کارت رفاهی از طرف بازنشسته',
        insertUserID: 'baz-1',
        requestFrom: 2,
      };
      const insertComplementary: InsertRequestComplementary = {
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
      this.send(insert, insertComplementary);
    } else {
      this.form.markAllAsTouched();
      console.log(this.findInvalidControls(this.form));
    }
  }

  ceremonyTypeChanged($event: MatSelectChange<any>) {
    this.restApiService.getRequestTypeConfig(this.requestTypeID, $event.value, null, null, null)
      .subscribe((a: GetRequestTypeConfigResponse) => {
        this.form.get('facilityDiscountPercent')?.setValue(a.data[0]?.defaultDiscountPercent ?? 0);
      });
  }
}
