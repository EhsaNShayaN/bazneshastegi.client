import {Component} from '@angular/core';
import {Validators} from '@angular/forms';
import {SelectItem} from '../../../shared/components/custom-select/custom-select.component';
import {LookUpDataResponse} from '../../../core/models/LookUpResponse';
import {MatSelectChange} from '@angular/material/select';
import {PersonInfo} from '../../../core/models/PersonInfoResponse';
import {BaseResult} from '../../../core/models/BaseResult';
import {CustomConstants} from '../../../core/constants/custom.constants';
import {BaseFormComponent} from '../base-form-component';

@Component({
  selector: 'app-modify-person-info',
  templateUrl: './modify-person-info.component.html',
  styleUrl: './modify-person-info.component.scss',
  standalone: false
})
export class ModifyPersonInfoComponent extends BaseFormComponent {
  states: SelectItem[] = [];
  cities: SelectItem[] = [];
  personCities: SelectItem[] = [];

  override createForm() {
    this.restApiService.getLookupData('state', '').subscribe((states: LookUpDataResponse) => {
      this.states = states.data.map(s => ({
        id: s.lookUpID,
        name: s.lookUpName,
      }));
    });
    this.form = this.fb.group({
      personFirstName: [this.personInfo!.personFirstName, Validators.required],
      personLastName: [this.personInfo!.personLastName, Validators.required],
      personNationalCode: [this.personInfo!.personNationalCode, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      personFatherName: [this.personInfo!.personFatherName, Validators.required],
      personCertificateNo: [this.personInfo!.personCertificateNo, Validators.required],
      personBirthDate: [this.personInfo!.personBirthDate, Validators.required],
      personBirthPlaceStateID: [null],
      personBirthPlaceCityID: [null],

      personPhone: [this.personInfo!.personPhone],
      personCellPhone: [this.personInfo!.personCellPhone, Validators.required],

      personStateID: ['', Validators.required],
      personCityID: ['', Validators.required],
      personRegion: [this.personInfo!.personRegion, Validators.required],
      personArea: [this.personInfo!.personArea, Validators.required],

      personPostalCode: [this.personInfo!.personPostalCode, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      personAddress: [this.personInfo!.personAddress, Validators.required],

      personCountryID: [''],

      backupFirstName: [''],
      backupLastName: [''],
      backupCellphone: [''],
      backupNationalCode: [''],
    });
  }

  submit() {
    if (this.form.valid) {
      const values = this.form.getRawValue();
      values.requestID = this.requestTypeID;
      console.log(values);
      this.restApiService.insertRequestForEditPersonInfo(values).subscribe((a: BaseResult<PersonInfo>) => {
        this.toaster.success(CustomConstants.THE_OPERATION_WAS_SUCCESSFUL);
      });
    } else {
      this.form.markAllAsTouched();
      console.log(this.findInvalidControls(this.form));
    }
  }

  stateChanged($event: MatSelectChange<any>) {
    this.restApiService.getLookupData('city', $event.value).subscribe((a: LookUpDataResponse) => {
      this.cities = a.data.map(s => ({
        id: s.lookUpID,
        name: s.lookUpName,
      }));
    });
  }

  personStateChanged($event: MatSelectChange<any>) {
    this.restApiService.getLookupData('city', $event.value).subscribe((a: LookUpDataResponse) => {
      this.personCities = a.data.map(s => ({
        id: s.lookUpID,
        name: s.lookUpName,
      }));
    });
  }
}
