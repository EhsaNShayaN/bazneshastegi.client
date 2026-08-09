import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseComponent} from '../../../../base-component';
import {RestApiService} from '../../../../core/rest-api.service';
import {SelectItem} from '../../../../shared/components/custom-select/custom-select.component';
import {RelationshipResponse} from '../../../../core/models/RelationshipResponse';
import {LookUpDataResponse} from '../../../../core/models/LookUpResponse';
import {MatSelectChange} from '@angular/material/select';
import {BaseResult} from '../../../../core/models/BaseResult';
import {NewRelatedRequest} from '../new-related.model';
import {ToastrService} from 'ngx-toastr';
import {CustomConstants} from '../../../../core/constants/custom.constants';
import {ActivatedRoute, Router} from '@angular/router';
import {InsertRequest} from '../../pay-fraction-certificate/pay-fraction-certificate.model';
import {PersonInfo} from '../../../../core/models/PersonInfoResponse';
import {RequestTypeAttachmentResponse} from '../../../../core/models/RequestTypeAttachmentResponse';
import {InsertResponse} from '../../../../core/models/InsertResponse';
import {TempPerson, TempPersonsResponse} from '../../../../core/models/TempPersonsResponse';
import jMoment from 'moment-jalaali';
import {SubmitLoadingDirective} from '../../../../core/directives/submit-loading.directive';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.scss',
  standalone: false
})
export class PersonFormComponent extends BaseComponent implements OnInit, OnDestroy {
  relationships: SelectItem[] = [];
  states: SelectItem[] = [];
  cities: SelectItem[] = [];
  personCities: SelectItem[] = [];
  educationTypes: SelectItem[] = [];
  educationBranches: SelectItem[] = [];
  universities: SelectItem[] = [];
  form!: FormGroup;

  private sub: any;
  private sub3: any;
  personInfo: PersonInfo | null = null;
  requestTypeID: string = '';
  tempPersonID: string = '';
  tempPerson?: TempPerson;
  @ViewChild('btn') btn!: SubmitLoadingDirective;

  constructor(private restApiService: RestApiService,
              private fb: FormBuilder,
              private toaster: ToastrService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    super();
    this.sub = this.activatedRoute.params.subscribe(({id, tempId}) => {
      this.requestTypeID = id;
      this.tempPersonID = tempId;
      this.sub3 = this.restApiService.personInfoSubject.subscribe(personInfo => {
        if (personInfo) {
          this.personInfo = personInfo;
          this.restApiService.getRequestTypeAttachment(this.requestTypeID).subscribe((b: RequestTypeAttachmentResponse) => {
            if (b.isSuccess) {
            }
          });
        }
      });
    });
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
          this.restApiService.getLookupData('EducationBranch', '').subscribe((educationBranches: LookUpDataResponse) => {
            this.educationBranches = educationBranches.data.map(s => ({
              id: s.lookUpID,
              name: s.lookUpName,
            }));
            this.restApiService.getLookupData('UniversityType', '').subscribe((universities: LookUpDataResponse) => {
              this.universities = universities.data.map(s => ({
                id: s.lookUpID,
                name: s.lookUpName,
              }));
              if (this.tempPersonID) {
                this.restApiService.getTempPerson().subscribe((res: TempPersonsResponse) => {
                  this.tempPerson = res.data.find(s => s.tempPersonID === this.tempPersonID);
                  const personBirthDate = this.tempPerson?.personBirthDate
                    ? jMoment(this.tempPerson.personBirthDate)
                    : null;
                  this.form = this.fb.group({
                    relationshipID: [this.tempPerson?.relationshipID, Validators.required],
                    personFirstName: [this.tempPerson?.personFirstName, Validators.required],
                    personLastName: [this.tempPerson?.personLastName, Validators.required],
                    personNationalCode: [this.tempPerson?.personNationalCode, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
                    personFatherName: [this.tempPerson?.personFatherName, Validators.required],
                    personCertificateNo: [this.tempPerson?.personCertificateNo, Validators.required],
                    personBirthDate: [personBirthDate, Validators.required],

                    personBirthPlaceStateID: [this.tempPerson?.personBirthPlaceStateID],
                    personBirthPlaceCityID: [null],

                    genderID: [this.tempPerson?.genderID, Validators.required],
                    maritalStatusID: [this.tempPerson?.maritalStatusID, Validators.required],

                    educationTypeID: [this.tempPerson?.educationTypeID],
                    educationBranchID: [null],
                    universityID: [this.tempPerson?.universityID],

                    personPhone: [this.tempPerson?.personPhone],
                    personCellPhone: [this.tempPerson?.personCellPhone, Validators.required],

                    personStateID: [this.tempPerson?.personStateID, Validators.required],
                    personCityID: [null, Validators.required],
                    personRegion: [this.tempPerson?.personRegion, Validators.required],
                    personArea: [this.tempPerson?.personArea, Validators.required],

                    personPostalCode: [this.tempPerson?.personPostalCode, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
                    personAddress: [this.tempPerson?.personAddress, Validators.required],

                    personDescription: [this.tempPerson?.personDescription],
                  });
                  if (this.tempPerson?.personBirthPlaceStateID && this.tempPerson?.personBirthPlaceCityID) {
                    this.onStateChanged(this.tempPerson?.personBirthPlaceStateID, this.tempPerson?.personBirthPlaceCityID);
                  }
                  if (this.tempPerson?.personStateID && this.tempPerson?.personCityID) {
                    this.onPersonStateChanged(this.tempPerson?.personStateID, this.tempPerson?.personCityID);
                  }
                });
              }
            });
          });
        });
      });
    });
  }

  startLoading() {
    this.btn.startLoading();
  }

  stopLoading() {
    this.btn.stopLoading();
  }

  submit() {
    if (this.form.valid) {
      this.startLoading();
      console.log(this.form.value);

      const insert: InsertRequest = {
        personID: this.personInfo!.personID,
        nationalCode: this.personInfo!.personNationalCode,
        personFirstName: this.personInfo!.personFirstName,
        personLastName: this.personInfo!.personLastName,
        requestDate: new Date(),
        requestTypeID: this.requestTypeID,
        requestText: 'درخواست افزودن وابسته جدید از طرف بازنشسته',
        insertUserID: 'baz-1',
        requestFrom: 2,
      };
      this.insert(insert).then(insertResponse => {
        if (insertResponse) {
          const value = this.form.value;
          value.requestId = insertResponse.data.requestID;
          if (this.tempPersonID) {
            value.tempPersonID = this.tempPersonID;
            this.restApiService.updateNewPerson(value).subscribe((a: BaseResult<NewRelatedRequest>) => {
              this.stopLoading();
              this.toaster.success(CustomConstants.THE_OPERATION_WAS_SUCCESSFUL)
                .onHidden.subscribe(() => {
                this.router.navigate([`/forms/none/${this.requestTypeID}`]);
              }, (err) => {
                this.stopLoading();
              });
            });
          } else {
            this.restApiService.insertNewPerson(value).subscribe((a: BaseResult<NewRelatedRequest>) => {
              this.stopLoading();
              this.toaster.success(CustomConstants.THE_OPERATION_WAS_SUCCESSFUL)
                .onHidden.subscribe(() => {
                this.router.navigate([`/forms/none/${this.requestTypeID}`]);
              }, (err) => {
                this.stopLoading();
              });
            });
          }
        } else {
          this.stopLoading();
        }
      }, (err) => {
        this.stopLoading();
      });
    } else {
      this.form.markAllAsTouched();
      console.log(this.findInvalidControls(this.form));
    }
  }

  insert(insert: InsertRequest): Promise<InsertResponse | null> {
    //this.startLoading();
    return new Promise(resolve => {
      this.restApiService.insert(insert).subscribe({
        next: (a: InsertResponse) => {
          if (a.isSuccess) {
            resolve(a);
          } else {
            //this.toaster.error(a.errors[0]?.errorMessage ?? 'خطای نامشخص', 'خطا');
            resolve(null);
            //this.stopLoading();
          }
        },
        error: (err) => {
          //this.stopLoading();
        }
      });
    });
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

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub3.unsubscribe();
  }
}
