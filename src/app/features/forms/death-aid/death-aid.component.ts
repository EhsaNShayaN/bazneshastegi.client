import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {BaseFormComponent} from '../base-form-component';
import {InsertRequest} from '../pay-fraction-certificate/pay-fraction-certificate.model';
import {DeathAidRequest} from './death-aid.model';

@Component({
  selector: 'app-death-aid',
  templateUrl: './death-aid.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class DeathAidComponent extends BaseFormComponent implements OnInit {
  constructor() {
    super();
    this.getRelations();
  }

  ngOnInit() {
  }

  override createForm() {
    this.form = this.fb.group({
      applicantRelationship: ['وابستگانم', Validators.required],
      requestDescription: [null],
      attachments: this.fb.array(
        this.requestTypes.map(s =>
          this.fb.group({
            obj: [s],
            type: [s.lookupName],
            file: [null, s.mandantory ? Validators.required : null],
            uploaded: [false]
          })))
    });
  }

  submit() {
    this.relatedPersonIDError = this.form.get('applicantRelationship')?.value === 'وابستگانم' && !this.relatedPersonID;
    console.log(this.form.getRawValue());
    if (this.form.valid && !this.relatedPersonIDError) {
      const request: DeathAidRequest = this.form.getRawValue();
      console.log('📌 فرم کمک هزینه تدفین ثبت شد:', request);
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
          const model: DeathAidRequest = {
            requestID: insertResponse.data.requestID,
            requestTypeID: this.requestTypeID,
            requestComplementaryID: '',
            relatedPersonID: this.form.get('applicantRelationship')?.value === 'وابستگانم' ? this.relatedPersonID : '',
            requestDescription: request.requestDescription
          };
          this.call<DeathAidRequest>(insertResponse.data, this.restApiService.insertRequestComplementary_Burial(model));
        }
      });
    } else {
      this.form.markAllAsTouched();
      console.log(this.findInvalidControls(this.form));
    }
  }
}
