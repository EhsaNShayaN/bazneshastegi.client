import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseComponent} from '../../../../base-component';
import {RestApiService} from '../../../../core/rest-api.service';
import {SelectItem} from '../../../../shared/components/custom-select/custom-select.component';
import {RelationshipResponse} from '../../../../core/models/RelationshipResponse';
import {LookUpDataResponse} from '../../../../core/models/LookUpResponse';
import {MatSelectChange} from '@angular/material/select';
import {InsertResponse} from '../../../../core/models/InsertResponse';
import {BaseResult} from '../../../../core/models/BaseResult';
import {NewRelatedRequest} from '../new-related.model';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.scss',
  standalone: false
})
export class PersonFormComponent extends BaseComponent implements OnInit {
  relationships: SelectItem[] = [];
  states: SelectItem[] = [];
  cities: SelectItem[] = [];
  personCities: SelectItem[] = [];
  educationTypes: SelectItem[] = [];
  universities: SelectItem[] = [];
  form!: FormGroup;

  constructor(private restApiService: RestApiService,
              private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.restApiService.getRelationship().subscribe((relationships: RelationshipResponse) => {
      this.relationships = relationships.data.map(s => ({
        id: s.relationshipID,
        name: s.relationshipName,
      }));
      this.restApiService.getLookupData('state', '').subscribe((states: LookUpDataResponse) => {
        this.states = states.data.map(s => ({
          id: s.lookUpID,
          name: s.lookUpName,
        }));
        this.restApiService.getLookupData('EducationType', '').subscribe((educationTypes: LookUpDataResponse) => {
          this.educationTypes = educationTypes.data.map(s => ({
            id: s.lookUpID,
            name: s.lookUpName,
          }));
          this.restApiService.getLookupData('UniversityType', '').subscribe((universities: LookUpDataResponse) => {
            this.universities = universities.data.map(s => ({
              id: s.lookUpID,
              name: s.lookUpName,
            }));
            this.form = this.fb.group({
              relationshipID: ['', Validators.required],
              personFirstName: ['', Validators.required],
              personLastName: ['', Validators.required],
              personNationalCode: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
              personFatherName: ['', Validators.required],
              personCertificateNo: ['', Validators.required],
              personBirthDate: ['', Validators.required],
              personBirthPlaceStateID: [null],
              personBirthPlaceCityID: [null],

              genderID: ['', Validators.required],
              maritalStatusID: ['', Validators.required],

              educationTypeID: [null],
              educationBranchID: [null],
              universityID: [null],

              personPhone: [''],
              personCellPhone: ['', Validators.required],

              personStateID: ['', Validators.required],
              personCityID: ['', Validators.required],
              personRegion: [null, Validators.required],
              personArea: [null, Validators.required],

              personPostalCode: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
              personAddress: ['', Validators.required],

              personDescription: [''],
            });
          });
        });
      });
    });
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.restApiService.insertNewPerson(this.form.value).subscribe((a: BaseResult<NewRelatedRequest>) => {

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
