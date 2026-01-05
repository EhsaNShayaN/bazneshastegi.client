import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseComponent} from '../../../../base-component';
import {RestApiService} from '../../../../core/rest-api.service';
import {SelectItem} from '../../../../shared/components/custom-select/custom-select.component';
import {RelationshipResponse} from '../../../../core/models/RelationshipResponse';
import {LookUpDataResponse} from '../../../../core/models/LookUpResponse';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.scss',
  standalone: false
})
export class PersonFormComponent extends BaseComponent implements OnInit {
  relationships: SelectItem[] = [];
  states: SelectItem[] = [];
  form!: FormGroup;

  constructor(private restApiService: RestApiService,
              private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.restApiService.getRelationship().subscribe((a: RelationshipResponse) => {
      this.relationships = a.data.map(s => ({
        id: s.relationshipID,
        name: s.relationshipName,
      }));
      this.restApiService.getLookupData('state', '').subscribe((a: LookUpDataResponse) => {
        this.states = a.data.map(s => ({
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
          personBirthPlaceStateID: ['', Validators.required],
          personBirthPlaceCityID: ['', Validators.required],

          genderID: ['', Validators.required],
          maritalStatusID: ['', Validators.required],

          educationTypeID: ['', Validators.required],
          universityID: ['', Validators.required],

          personPhone: [''],
          personCellPhone: ['', Validators.required],

          personStateID: ['', Validators.required],
          personCityID: ['', Validators.required],
          personRegion: ['', Validators.required],
          personArea: ['', Validators.required],

          personPostalCode: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
          personAddress: ['', Validators.required],

          personDescription: [''],
        });
      });
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
  }
}
