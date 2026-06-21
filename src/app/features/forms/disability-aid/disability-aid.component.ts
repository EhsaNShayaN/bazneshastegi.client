import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {BaseFormComponent} from '../base-form-component';
import {InsertRequest} from '../pay-fraction-certificate/pay-fraction-certificate.model';
import {DisabilityAidRequest} from './disability-aid.model';

@Component({
  selector: 'app-disability-aid',
  templateUrl: './disability-aid.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class DisabilityAidComponent extends BaseFormComponent implements OnInit {
  columnsToDisplay = [
    {key: 'confirmDate', name: 'تاریخ دریافت'},
    {key: 'facilityAmount', name: 'مبلغ دریافتی'},
    {key: 'mainPersonFirstName', name: 'نام دریافت کننده'},
    {key: 'mainPersonLastName', name: 'نام خانوادگی دریافت کننده'},
  ];
  currentColumnsToDisplay: string[] = this.columnsToDisplay.map(s => s.key);
  constructor() {
    super();
    this.getRelations();
  }

  ngOnInit() {
  }

  override createForm() {
    this.form = this.fb.group({
      applicantRelationship: ['خودم', Validators.required],
      requestDescription: [null],
      hasWelfareCertificate: [null , Validators.required],
      illnessHistory: [null, Validators.required],
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
      const request: DisabilityAidRequest = this.form.getRawValue();
      console.log('📌 فرم کمک هزینه معلولیت ثبت شد:', request);
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
          const model: DisabilityAidRequest = {
            requestID: insertResponse.data.requestID,
            requestTypeID: this.requestTypeID,
            requestComplementaryID: '',
            relatedPersonID: this.form.get('applicantRelationship')?.value === 'وابستگانم' ? this.relatedPersonID : '',
            requestDescription: request.requestDescription,
            hasWelfareCertificate: request.hasWelfareCertificate,
            illnessHistory: request.illnessHistory,
          };
          this.call<DisabilityAidRequest>(insertResponse.data, this.restApiService.insertRequestComplementary_PhysicalDisability(model));
        }
      });
    } else {
      this.form.markAllAsTouched();
      console.log(this.findInvalidControls(this.form));
    }
  }
}
