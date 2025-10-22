import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {WelfareCardRequest} from './welfare-card.model';
import {BaseFormComponent} from '../base-form-component';
import {LookUpDataResponse} from '../../../core/models/LookUpResponse';
import {SelectItem} from '../../../shared/components/custom-select/custom-select.component';
import {InsertRequest, InsertRequestComplementary} from '../pay-fraction-certificate/pay-fraction-certificate.model';
import {InsertResponse} from '../../../core/models/InsertResponse';
import {InsertComplementaryResponse} from '../../../core/models/InsertComplementaryResponse';
import {MatSelectChange} from '@angular/material/select';
import {GetRequestTypeConfigResponse} from '../../../core/models/GetRequestTypeConfigResponse';

@Component({
  selector: 'app-welfare-card',
  templateUrl: './welfare-card.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class WelfareCardComponent extends BaseFormComponent implements OnInit {
  columnsToDisplay = [
    {key: 'a', name: 'شماره کارت'},
    {key: 'b', name: 'تاریخ صدور'},
    {key: 'c', name: 'نوع صدور'},
  ];
  columnsToDisplay0: string[] = this.columnsToDisplay.map(s => s.key);
  issueTypes: SelectItem[] = [];
  facilityReceiveTypes: SelectItem[] = [];
  defaultAmount: number = 0;
  deliveryCost: number = 0;

  constructor() {
    super();
  }

  ngOnInit() {
    this.restApiService.getLookupData('RefahCardIssueType', '').subscribe((a: LookUpDataResponse) => {
      this.issueTypes = a.data.map(s => ({
        id: s.lookUpID,
        name: s.lookUpName,
      }));
    });
    this.restApiService.getLookupData('FacilityReceiveType', '').subscribe((a: LookUpDataResponse) => {
      this.facilityReceiveTypes = a.data.map(s => ({
        id: s.lookUpID,
        name: s.lookUpName,
      }));
    });
  }

  override createForm(): void {
    this.form = this.fb.group({
      issueTypeLookupID: ['', Validators.required],
      facilityReceiveTypeLookupID: ['', Validators.required],
      facilityReceiverFullName: [''],
      previousCardNumber: [''],
      description: [''],
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
    console.log(this.form.getRawValue());
    if (this.form.valid) {
      const request: WelfareCardRequest = this.form.getRawValue();
      console.log('📌 فرم کارت رفاهی ثبت شد:', request);
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
      this.restApiService.insert(insert).subscribe((a: InsertResponse) => {
        if (a.isSuccess) {
          console.log(a);
          const insertComplementary: InsertRequestComplementary = {
            requestID: a.data.requestID,
            requestTypeID: this.requestTypeID,
            personID: this.personInfo!.personID,
            issueTypeLookupID: request.issueTypeLookupID,
            facilityReceiveTypeLookupID: request.facilityReceiveTypeLookupID,
            facilityReceiverFullName: request.facilityReceiverFullName,
            previousCardNumber: request.previousCardNumber,
          };
          this.restApiService.insertComplementary(insertComplementary).subscribe((b: InsertComplementaryResponse) => {
            console.log(b);
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

  issueTypeChanged($event: MatSelectChange<any>) {
    this.restApiService.getRequestTypeConfig(this.requestTypeID, $event.value, null, null, null)
      .subscribe((a: GetRequestTypeConfigResponse) => {
        this.defaultAmount = a.data[0]?.defaultAmount ?? 0;
        this.deliveryCost = a.data[0]?.deliveryCost ?? 0;
      });
  }
}
