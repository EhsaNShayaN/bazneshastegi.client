import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {StationaryRequest} from './stationary.model';
import {BaseFormComponent} from '../base-form-component';
import {InsertRequest, InsertRequestComplementary} from '../pay-fraction-certificate/pay-fraction-certificate.model';
import {InsertResponse} from '../../../core/models/InsertResponse';
import {InsertComplementaryResponse} from '../../../core/models/InsertComplementaryResponse';
import {LookUpData, LookUpDataResponse} from '../../../core/models/LookUpResponse';
import {MatSelectChange} from '@angular/material/select';
import {GetRequestTypeConfigResponse} from '../../../core/models/GetRequestTypeConfigResponse';

@Component({
  selector: 'app-stationary',
  templateUrl: './stationary.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class StationaryComponent extends BaseFormComponent implements OnInit {
  columnsToDisplay = [
    {key: 'mainpersonFirstName', name: 'نام'},
    {key: 'mainpersonLastName', name: 'نام خانوادگی'},
    {key: 'facilityReceiverFullName', name: 'وام گیرنده'},
    {key: 'facilityGiverDesc', name: 'وام‌دهنده'},
    {key: 'facilityAmount', name: 'مبلغ وام'}
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
      const request: StationaryRequest = this.form.getRawValue();
      console.log('📌 فرم لوازم تحریر ثبت شد:', request);
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
      this.restApiService.insert(insert).subscribe((a: InsertResponse) => {
        if (a.isSuccess) {
          console.log(a);
          const insertComplementary: InsertRequestComplementary = {
            requestTypeID: this.requestTypeID,
            requestID: a.data.requestID,
            personID: this.personInfo!.personID,
            ceremonyDate: new Date(),
            facilityAmount: this.facilityAmount,
            prizeReceiverLookupID: request.prizeReceiver,
            relatedPersonID: this.relatedPersonID,
          };
          this.restApiService.insertComplementary(insertComplementary).subscribe((b: InsertComplementaryResponse) => {
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

  prizeChanged($event: MatSelectChange<string>) {
    this.restApiService.getRequestTypeConfig(this.requestTypeID, $event.value).subscribe((a: GetRequestTypeConfigResponse) => {
      this.facilityAmount = a.data[0].defaultAmount;
    });
  }
}
