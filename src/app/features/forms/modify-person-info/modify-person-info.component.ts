import {Component} from '@angular/core';
import {Validators} from '@angular/forms';
import {SelectItem} from '../../../shared/components/custom-select/custom-select.component';
import {LookUpDataResponse} from '../../../core/models/LookUpResponse';
import {MatSelectChange} from '@angular/material/select';
import {PersonInfo} from '../../../core/models/PersonInfoResponse';
import {BaseResult} from '../../../core/models/BaseResult';
import {CustomConstants} from '../../../core/constants/custom.constants';
import {BaseFormComponent} from '../base-form-component';
import {InsertRequest} from '../pay-fraction-certificate/pay-fraction-certificate.model';
import jMoment from 'moment-jalaali';

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
  src = '/assets/no-profile.png';

  override createForm() {
    this.restApiService.getLookupData('state', '').subscribe((states: LookUpDataResponse) => {
      this.states = states.data.map(s => ({
        id: s.lookUpID,
        name: s.lookUpName,
      }));
    });
    if (this.personInfo?.picture) {
      this.src = this.personInfo.picture;
    }
    const personBirthDate = this.personInfo?.personBirthDate
      ? jMoment(this.personInfo.personBirthDate)
      : null;
    this.form = this.fb.group({
      personFirstName: [this.personInfo!.personFirstName, Validators.required],
      personLastName: [this.personInfo!.personLastName, Validators.required],
      personNationalCode: [this.personInfo!.personNationalCode, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      personFatherName: [this.personInfo!.personFatherName, Validators.required],
      personCertificateNo: [this.personInfo!.personCertificateNo, Validators.required],
      personBirthDate: [personBirthDate, Validators.required],
      personBirthPlaceStateID: [this.personInfo!.personBirthPlaceStateID],
      personBirthPlaceCityID: [null],

      personCellPhone: [this.personInfo!.personCellPhone, Validators.required],
      personPhone: [this.personInfo!.personPhone],

      latitude: [null],
      longitude: [null],

      personStateID: [this.personInfo!.personStateID, Validators.required],
      personCityID: [null, Validators.required],
      personRegion: [this.personInfo!.personRegion, Validators.required],
      personArea: [this.personInfo!.personArea, Validators.required],

      personPostalCode: [this.personInfo!.personPostalCode, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      personAddress: [this.personInfo!.personAddress, Validators.required],

      personCountryID: [''],

      backupFirstName: [this.personInfo!.backupFirstName, Validators.required],
      backupLastName: [this.personInfo!.backupLastName, Validators.required],
      backupNationalCode: [this.personInfo!.backupNationalCode, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      backupCellPhone: [this.personInfo!.backupCellphone, Validators.required],
      backupPhone: [this.personInfo!.backupPhone],
    });
    if (this.personInfo?.personBirthPlaceStateID && this.personInfo?.personBirthPlaceCityID) {
      this.onStateChanged(this.personInfo?.personBirthPlaceStateID, this.personInfo?.personBirthPlaceCityID);
    }
    if (this.personInfo?.personStateID && this.personInfo?.personCityID) {
      this.onPersonStateChanged(this.personInfo?.personStateID, this.personInfo?.personCityID);
    }
  }

  submit() {
    if (this.form.valid) {
      const values = this.form.getRawValue();
      values.requestID = this.requestTypeID;
      console.log(values);
      const insert: InsertRequest = {
        personID: this.personInfo!.personID,
        nationalCode: this.personInfo!.personNationalCode,
        personFirstName: this.personInfo!.personFirstName,
        personLastName: this.personInfo!.personLastName,
        requestDate: new Date(),
        requestTypeID: this.requestTypeID,
        requestText: 'درخواست اصلاح اطلاعات فردی از طرف بازنشسته',
        insertUserID: 'baz-1',
        requestFrom: 2,
      };
      this.insert(insert).then(insertResponse => {
        if (insertResponse) {
          const value = this.form.value;
          value.requestId = insertResponse.data.requestID;
          this.restApiService.insertRequestForEditPersonInfo(values).subscribe((a: BaseResult<PersonInfo>) => {
            this.toaster.success(CustomConstants.THE_OPERATION_WAS_SUCCESSFUL);
            this.stopLoading();
          });
        }
      });
    } else {
      this.form.markAllAsTouched();
      console.log(this.findInvalidControls(this.form));
    }
  }

  stateChanged($event: MatSelectChange<any>) {
    this.onStateChanged($event.value);
  }

  onStateChanged(stateId: string, cityId: string | null = null) {
    this.restApiService.getLookupData('city', stateId).subscribe((a: LookUpDataResponse) => {
      this.cities = a.data.map(s => ({
        id: s.lookUpID,
        name: s.lookUpName,
      }));
      if (cityId) {
        this.form.get('personBirthPlaceCityID')?.setValue(cityId);
      }
    });
  }

  personStateChanged($event: MatSelectChange<any>) {
    this.onPersonStateChanged($event.value);
  }

  onPersonStateChanged(stateId: string, cityId: string | null = null) {
    this.restApiService.getLookupData('city', stateId).subscribe((a: LookUpDataResponse) => {
      this.personCities = a.data.map(s => ({
        id: s.lookUpID,
        name: s.lookUpName,
      }));
      if (cityId) {
        this.form.get('personCityID')?.setValue(cityId);
      }
    });
  }
}
