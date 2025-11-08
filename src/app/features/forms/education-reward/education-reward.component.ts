import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {EducationRewardRequest} from './education-reward.model';
import {BaseFormComponent} from '../base-form-component';
import {InsertRequest, InsertRequestComplementary} from '../pay-fraction-certificate/pay-fraction-certificate.model';
import {LookUpData, LookUpDataResponse} from '../../../core/models/LookUpResponse';
import {MatSelectChange} from '@angular/material/select';
import {GetRequestTypeConfigResponse} from '../../../core/models/GetRequestTypeConfigResponse';

@Component({
  selector: 'app-education-reward',
  templateUrl: './education-reward.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class EducationRewardComponent extends BaseFormComponent implements OnInit {
  columnsToDisplay = [
    {key: 'mainpersonFirstName', name: 'نام'},
    {key: 'mainpersonLastName', name: 'نام خانوادگی'},
    {key: 'relation', name: 'نسبت'},
    {key: 'grade', name: 'مقطع تحصیلی'},
    {key: 'facilityAmount', name: 'مبلغ تسهیلات دریافتی'},
    {key: 'facilityDate', name: 'تاریخ دریافت'},
  ];
  columnsToDisplay0: string[] = this.columnsToDisplay.map(s => s.key);
  prizeReceivers: LookUpData[] = [];
  facilityAmount?: number;

  constructor() {
    super();
    this.getRelations();
  }

  override createForm() {
    this.form = this.fb.group({
      prizeReceiver: ['', Validators.required], // محصل یا دانشجو
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
    this.restApiService.getLookupData('PrizeReceiver', '').subscribe((a: LookUpDataResponse) => {
      this.prizeReceivers = a.data;
    });
  }

  submit() {
    if (this.form.valid) {
      if (!this.relatedPersonID) {
        this.relatedPersonIDError = true;
        return;
      }
      const request: EducationRewardRequest = this.form.getRawValue();
      console.log('📌 فرم جایزه تحصیلی ثبت شد:', request);
      console.log(request);
      const insert: InsertRequest = {
        personID: this.personInfo!.personID,
        nationalCode: this.personInfo!.personNationalCode,
        personFirstName: this.personInfo!.personFirstName,
        personLastName: this.personInfo!.personLastName,
        requestDate: new Date(),
        requestTypeID: this.requestTypeID,
        requestText: 'لوازم تحریر از طرف بازنشسته',
        insertUserID: 'baz-1',
        requestFrom: 2,
      };
      const insertComplementary: InsertRequestComplementary = {
        requestTypeID: this.requestTypeID,
        requestID: '',
        personID: this.personInfo!.personID,
        facilityAmount: this.facilityAmount,
        prizeReceiverLookupID: request.prizeReceiver,
        relatedPersonID: this.relatedPersonID,
      };
      this.send(insert, insertComplementary);
    } else {
      this.form.markAllAsTouched();
      console.log(this.findInvalidControls(this.form));
    }
  }

  prizeChanged($event: MatSelectChange<string>) {
    this.restApiService.getRequestTypeConfig(this.requestTypeID, $event.value).subscribe((a: GetRequestTypeConfigResponse) => {
      this.facilityAmount = a.data[0].defaultAmount;
    });
  }
}
