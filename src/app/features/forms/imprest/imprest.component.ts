import {Component} from '@angular/core';
import {Validators} from '@angular/forms';
import {BaseFormComponent} from '../base-form-component';
import {GetRequestTypeConfigResponse, RequestTypeConfigInfo} from '../../../core/models/GetRequestTypeConfigResponse';
import {InsertRequest} from '../pay-fraction-certificate/pay-fraction-certificate.model';
import {ImprestRequest} from './imprest.model';

@Component({
  selector: 'app-imprest',
  templateUrl: './imprest.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class ImprestComponent extends BaseFormComponent {
  columnsToDisplay = [
    {key: 'confirmDate', name: 'تاریخ دریافت'},
    {key: 'facilityAmount', name: 'مبلغ دریافتی'}
  ];
  currentColumnsToDisplay: string[] = this.columnsToDisplay.map(s => s.key);
  requestTypeConfig?: RequestTypeConfigInfo;

  constructor() {
    super();
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
      const request: ImprestRequest = this.form.getRawValue();
      console.log('📌 فرم مساعده ثبت شد:', request);
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
          const model: ImprestRequest = {
            requestID: insertResponse.data.requestID,
            requestTypeID: this.requestTypeID,
            requestComplementaryID: '',
            requestDescription: request.requestDescription,
            facilityAmount: request.facilityAmount,
          };
          this.call<ImprestRequest>(
            insertResponse.data,
            this.restApiService.insertRequestComplementary_Imprest(model));
        }
      });
    } else {
      this.form.markAllAsTouched();
      console.log(this.findInvalidControls(this.form));
    }
  }
}
