import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {BaseFormComponent} from '../base-form-component';
import {InsertRequest} from '../pay-fraction-certificate/pay-fraction-certificate.model';
import {GetLookupResponse} from '../../../core/models/GetLookupResponse';
import {SelectItem} from '../../../shared/components/custom-select/custom-select.component';
import {NursingHelpRequest} from './nursing-help.model';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-nursing-help',
  templateUrl: './nursing-help.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class NursingHelpComponent extends BaseFormComponent implements OnInit {
  issueTypes: SelectItem[] = [];

  constructor() {
    super();
    this.getRelations();
  }

  ngOnInit() {
    this.restApiService.getLookup('NursingExpensesIssueType').subscribe((a: GetLookupResponse) => {
      this.issueTypes = a.data.map(s => ({
        id: s.lookUpID,
        name: s.lookUpName,
      }));
    });
  }

  override createForm() {
    this.form = this.fb.group({
      applicantRelationship: ['خودم', Validators.required],
      requestDescription: [null],
      issueTypeLookupID: [null, Validators.required],
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
      const request: NursingHelpRequest = this.form.getRawValue();
      console.log('📌 فرم معرفی نامه آموزشی ثبت شد:', request);
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
          const model: NursingHelpRequest = {
            requestID: insertResponse.data.requestID,
            requestTypeID: this.requestTypeID,
            requestComplementaryID: '',
            relatedPersonID: this.form.get('applicantRelationship')?.value === 'وابستگانم' ? this.relatedPersonID : '',
            requestDescription: request.requestDescription,
            issueTypeLookupID: request.issueTypeLookupID,
          };
          this.call<NursingHelpRequest>(insertResponse.data, this.restApiService.InsertRequestComplementary_NursingExpenses(model));
        }
      });
    } else {
      this.form.markAllAsTouched();
      console.log(this.findInvalidControls(this.form));
    }
  }

  lookupChanged($event: MatSelectChange<any>) {

  }
}
