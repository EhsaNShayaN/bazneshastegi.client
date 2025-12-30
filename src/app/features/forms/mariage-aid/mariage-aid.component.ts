import {Component} from '@angular/core';
import {Validators} from '@angular/forms';
import {BaseFormComponent} from '../base-form-component';
import {GetRequestTypeConfigResponse, RequestTypeConfigInfo} from '../../../core/models/GetRequestTypeConfigResponse';
import {InsertRequest} from '../pay-fraction-certificate/pay-fraction-certificate.model';
import {MarriageAidRequest} from './marriage-aid.model';

@Component({
  selector: 'app-mariage-aid',
  templateUrl: './mariage-aid.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class MariageAidComponent extends BaseFormComponent {
  columnsToDisplay = [
    {key: 'mainPersonFirstName', name: 'نام'},
    {key: 'mainPersonLastName', name: 'نام خانوادگی'},
    {key: 'facilityReceiverFullName', name: 'وام گیرنده'},
    {key: 'facilityGiverDesc', name: 'وام‌دهنده'},
    {key: 'facilityAmount', name: 'مبلغ وام'}
  ];
  columnsToDisplay0: string[] = this.columnsToDisplay.map(s => s.key);
  requestTypeConfig?: RequestTypeConfigInfo;

  constructor() {
    super();
    this.getRelations();
  }

  override createForm() {
    this.restApiService.getRequestTypeConfig(this.requestTypeID, null, null, null, null)
      .subscribe((a: GetRequestTypeConfigResponse) => {
        this.requestTypeConfig = a.data[0];
        this.form = this.fb.group({
          facilityAmount: [this.requestTypeConfig?.defaultAmount, Validators.required],
          requestDescription: [''],
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

  submit() {
    console.log(this.form.getRawValue());
    if (this.form.valid) {
      if (!this.relatedPersonID) {
        this.relatedPersonIDError = true;
        return;
      }
      const request: MarriageAidRequest = this.form.getRawValue();
      console.log('📌 فرم کمک هزینه ازدواج ثبت شد:', request);
      const insert: InsertRequest = {
        personID: this.personInfo!.personID,
        nationalCode: this.personInfo!.personNationalCode,
        personFirstName: this.personInfo!.personFirstName,
        personLastName: this.personInfo!.personLastName,
        requestDate: new Date(),
        requestTypeID: this.requestTypeID,
        requestText: 'از کار افتادگی از طرف بازنشسته',
        insertUserID: 'baz-1',
        requestFrom: 2,
      };
      this.insert(insert).then(insertResponse => {
        if (insertResponse) {
          const model: MarriageAidRequest = {
            requestID: insertResponse.data.requestID,
            requestTypeID: this.requestTypeID,
            requestComplementaryID: '',
            relatedPersonID: this.relatedPersonID,
            requestDescription: request.requestDescription,
            facilityAmount: request.facilityAmount,
            facilityInstalementCount: request.facilityInstalementCount,
            profitOrDiscountPercent: request.profitOrDiscountPercent,
            facilityInstalementAmount: request.facilityInstalementAmount,
          };
          this.call<MarriageAidRequest>(
            insertResponse.data,
            this.restApiService.insertRequestComplementary_MarriageAid(model));
        }
      });
    } else {
      this.form.markAllAsTouched();
      console.log(this.findInvalidControls(this.form));
    }
  }
}
