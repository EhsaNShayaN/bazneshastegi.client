import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {HealthBookletRequest} from './health-booklet.model';
import {BaseFormComponent} from '../base-form-component';
import {InsertRequest, InsertRequestComplementary} from '../pay-fraction-certificate/pay-fraction-certificate.model';
import {GetRequestTypeConfigResponse, RequestTypeConfigInfo} from '../../../core/models/GetRequestTypeConfigResponse';

@Component({
  selector: 'app-health-booklet',
  templateUrl: './health-booklet.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class HealthBookletComponent extends BaseFormComponent implements OnInit {
  requestTypeConfig?: RequestTypeConfigInfo;

  constructor() {
    super();
    this.createForm();
  }

  override createForm() {
    this.restApiService.getRequestTypeConfig(this.requestTypeID, null, null, this.personInfo?.pensionaryStatusID ?? '', this.personInfo?.genderID ?? '')
      .subscribe((a: GetRequestTypeConfigResponse) => {
        this.requestTypeConfig = a.data[0];
        this.form = this.fb.group({
          issueTypeLookupID: ['', Validators.required],
          facilityReceiveTypeLookupID: ['', Validators.required],
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
      });
  }

  ngOnInit() {
  }

  submit() {
    this.relatedPersonIDError = !this.relatedPersonID;
    console.log(this.form.getRawValue());
    if (this.form.valid && !this.relatedPersonIDError) {
      const request: HealthBookletRequest = this.form.getRawValue();
      console.log('📌 فرم دفترچه درمانی ثبت شد:', request);
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
        relatedPersonID: this.relatedPersonID,
        issueTypeLookupID: request.issueTypeLookupID,
        facilityReceiveTypeLookupID: request.facilityReceiveTypeLookupID,
      };
      this.send(insert, insertComplementary);
    } else {
      this.form.markAllAsTouched();
      console.log(this.findInvalidControls(this.form));
    }
  }
}
