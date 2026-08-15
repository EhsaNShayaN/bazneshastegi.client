import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {HealthBookletRequest} from './treatment-booklet.model';
import {BaseFormComponent} from '../base-form-component';
import {InsertRequest, InsertRequestComplementary} from '../pay-fraction-certificate/pay-fraction-certificate.model';
import {GetLookupResponse, LookupInfo} from '../../../core/models/GetLookupResponse';
import {CalculateMedicalTreatmentCostInfo, CalculateMedicalTreatmentCostResponse} from '../../../core/models/CalculateMedicalTreatmentCostResponse';

@Component({
  selector: 'app-treatment-booklet',
  templateUrl: './treatment-booklet.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class TreatmentBookletComponent extends BaseFormComponent implements OnInit {
  calculateMedicalTreatmentCost?: CalculateMedicalTreatmentCostInfo;
  medicalTreatmentServiceTypes: LookupInfo[] = [];
  medicalBookletReceiveTypes: LookupInfo[] = [];

  constructor() {
    super();
    this.getRelations();
  }

  override createForm() {
    this.restApiService.getLookup('MedicalTreatmentServiceType').subscribe((a: GetLookupResponse) => {
      this.medicalTreatmentServiceTypes = a.data;
    });
    this.restApiService.getLookup('MedicalBookletReceiveType').subscribe((a: GetLookupResponse) => {
      this.medicalBookletReceiveTypes = a.data;
    });
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
  }

  calculateMedicalTreatment() {
    const medicalTreatmentServiceTypeId = this.form.get('issueTypeLookupID')?.value;
    const medicalBookletReceiveTypeId = this.form.get('facilityReceiveTypeLookupID')?.value;
    if (this.relatedPersonID && medicalTreatmentServiceTypeId && medicalBookletReceiveTypeId) {
      this.restApiService.calculateMedicalTreatmentCost(this.requestTypeID, medicalTreatmentServiceTypeId, this.relatedPersonID, medicalBookletReceiveTypeId)
        .subscribe((a: CalculateMedicalTreatmentCostResponse) => {
          this.calculateMedicalTreatmentCost = a.data[0];
        });
    }
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
