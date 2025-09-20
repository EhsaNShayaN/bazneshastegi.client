import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StationaryRequest} from './stationary.model';
import {BaseFormComponent} from '../base-form-component';
import {InsertRequest, InsertRequestComplementary} from '../pay-fraction-certificate/pay-fraction-certificate.model';
import {InsertResponse} from '../../../core/models/InsertResponse';
import {CustomConstants} from '../../../core/constants/custom.constants';
import {InsertComplementaryResponse} from '../../../core/models/InsertComplementaryResponse';
import {LookUpData, LookUpDataResponse} from '../../../core/models/LookUpResponse';

@Component({
  selector: 'app-stationary',
  templateUrl: './stationary.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class StationaryComponent extends BaseFormComponent {
  form: FormGroup;
  prizeReceivers: LookUpData[] = [];

  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      relation: ['', Validators.required],
      grade: ['', Validators.required],
      loanAmount: [null, [Validators.required, Validators.min(1000)]],
      prizeReceiver: ['', Validators.required], // محصل یا دانشجو
      dependents: this.fb.array([]),
      attachments: this.fb.array([
        this.fb.group({type: 'کپی شناسنامه', uploaded: [false]}),
        this.fb.group({type: 'کپی کارت ملی', uploaded: [false]})
      ])
    });
    this.sub2 = this.personInfoSubject.subscribe(data => {
    });
  }

  override ngOnInit() {
    super.ngOnInit();
    this.restApiService.getLookupData('PrizeReceiver', null).subscribe((a: LookUpDataResponse) => {
      this.prizeReceivers = a.data;
    });
  }

  submit() {
    if (this.form.valid) {
      const request: StationaryRequest = this.form.value;
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
      this.restApiService.insert(insert).subscribe((c: InsertResponse) => {
        console.log(c.data);
        const insertComplementary: InsertRequestComplementary = {
          requestID: c.data.requestID,
          personID: this.personInfo!.personID,
          ceremonyDate: new Date(),
          facilityAmount: request.loanAmount,
          prizeReceiverLookupID: request.prizeReceiver,
        };
        this.restApiService.insertComplementary(insertComplementary).subscribe((d: InsertComplementaryResponse) => {
          console.log(d);
          this.toaster.success(CustomConstants.THE_OPERATION_WAS_SUCCESSFUL, '', {});
          this.form.reset();
          this.form.markAsPristine();
          this.form.markAsUntouched();
        });
      });
    } else {
      this.form.markAllAsTouched();
      console.log(this.findInvalidControls(this.form));
    }
  }
}
