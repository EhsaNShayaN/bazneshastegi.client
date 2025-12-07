import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {endpoint} from './services/cookie-utils';
import {BaseResult} from './models/BaseResult';
import {AuthService} from './services/auth.service';
import {RequestTypeResponse} from './models/RequestTypeResponse';
import {LookUpDataResponse} from './models/LookUpResponse';
import {PersonInfo, PersonInfoResponse} from './models/PersonInfoResponse';
import {InsertRequest, InsertRequestAttachment, InsertRequestComplementary} from '../features/forms/pay-fraction-certificate/pay-fraction-certificate.model';
import {InsertResponse} from './models/InsertResponse';
import {InsertComplementaryResponse} from './models/InsertComplementaryResponse';
import {RelatedPersonsResponse} from './models/RelatedPersonsResponse';
import {LoginForPortal, LoginForPortalResponse} from './models/LoginForPortalResponse';
import {RequestTypeAttachmentResponse} from './models/RequestTypeAttachmentResponse';
import {InsertRequestAttachmentResponse} from './models/InsertRequestAttachmentResponse';
import {ActiveFacilitiesOfPersonResponse} from './models/ActiveFacilitiesOfPersonResponse';
import {GetRequestTypeConfigResponse} from './models/GetRequestTypeConfigResponse';
import {GetRequestTypeGuideResponse} from './models/GetRequestTypeGuideResponse';
import {GetLookupResponse} from './models/GetLookupResponse';
import {BreakdownRequest} from '../features/forms/breakdown/breakdown.model';
import {DeathAidRequest} from '../features/forms/death-aid/death-aid.model';
import {GrandInAidRequest} from '../features/forms/grandIn-aid/grandIn-aid.model';
import {DisabilityAidRequest} from '../features/forms/disability-aid/disability-aid.model';
import {EducationalIntroductionRequest} from '../features/forms/educational-introduction/educational-introduction.model';
import {SportIntroductionRequest} from '../features/forms/sport-introduction/sport-introduction.model';
import {NursingHelpRequest} from '../features/forms/nursing-help/nursing-help.model';
import {MarriageLoanRequest} from '../features/forms/marriage-loan/marriage-loan.model';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  loginSubject: BehaviorSubject<LoginForPortal | null> = new BehaviorSubject<LoginForPortal | null>(null);
  personInfoSubject: BehaviorSubject<PersonInfo | null> = new BehaviorSubject<PersonInfo | null>(null);
  formSubmittedSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  loginForPortal(nationalCode: string, cellPhone: string): Observable<any> {
    return this.http.get<LoginForPortalResponse>(`${endpoint()}forms/loginForPortal?nationalCode=${nationalCode}&cellPhone=${cellPhone}`)
      .pipe(catchError(this.handleError),
        map((d: LoginForPortalResponse) => {
          if (d.isSuccess) {
            this.loginSubject.next(d.data);
          }
          return d;
        }));
  }

  getPersonInfo(): Observable<any> {
    return this.http.get<PersonInfoResponse>(`${endpoint()}forms/personInfo`)
      .pipe(catchError(this.handleError),
        map((d: PersonInfoResponse) => {
          if (d.isSuccess) {
            this.personInfoSubject.next(d.data);
          }
          return d;
        }));
  }

  getActiveFacilitiesOfPerson(requestTypeId: string): Observable<any> {
    return this.http.get<ActiveFacilitiesOfPersonResponse>(`${endpoint()}forms/activeFacilitiesOfPerson?requestTypeId=${requestTypeId}`,).pipe(
      catchError(this.handleError)
    );
  }

  getRequestTypeConfig(requestTypeId: string,
                       lookupID: string | null = null,
                       facilityReceiverRelationshipID: string | null = null,
                       pensionaryStatusCategory: string | null = null,
                       genderLookupID: string | null = null): Observable<any> {
    let query = `${endpoint()}forms/getRequestTypeConfig?requestTypeId=${requestTypeId}`;
    if (lookupID) {
      query += `&lookupID=${lookupID}`;
    }
    if (facilityReceiverRelationshipID) {
      query += `&facilityReceiverRelationshipID=${facilityReceiverRelationshipID}`;
    }
    if (pensionaryStatusCategory) {
      query += `&pensionaryStatusCategory=${pensionaryStatusCategory}`;
    }
    if (genderLookupID) {
      query += `&genderLookupID=${genderLookupID}`;
    }
    return this.http.get<GetRequestTypeConfigResponse>(query).pipe(
      catchError(this.handleError)
    );
  }

  getRequestTypeGuide(requestTypeId: string): Observable<any> {
    return this.http.get<GetRequestTypeGuideResponse>(`${endpoint()}forms/getRequestTypeGuide?requestTypeId=${requestTypeId}`).pipe(
      catchError(this.handleError)
    );
  }

  getLookup(lookupType: string): Observable<any> {
    return this.http.get<GetLookupResponse>(`${endpoint()}forms/getLookup?lookupType=${lookupType}`).pipe(
      catchError(this.handleError)
    );
  }

//MedicalTreatmentServiceType
  getRelatedPersons(): Observable<any> {
    return this.http.get<RelatedPersonsResponse>(`${endpoint()}forms/relatedPersons`,).pipe(
      catchError(this.handleError)
    );
  }

  getRequestTypeAttachment(requestTypeID: string): Observable<any> {
    return this.http.get<RequestTypeAttachmentResponse>(`${endpoint()}forms/requestTypeAttachment?requestTypeID=${requestTypeID}`,).pipe(
      catchError(this.handleError)
    );
  }

  getRequestTypes(): Observable<any> {
    return this.http.get<RequestTypeResponse>(`${endpoint()}forms/requestTypes`,).pipe(
      catchError(this.handleError),
      map((d: RequestTypeResponse) => {
        return d;
      }));
  }

  getLookupData(lookupType: string, lookUpParentID: string): Observable<any> {
    let url = `${endpoint()}forms/lookupData?lookupType=${lookupType}`;
    if (lookUpParentID) {
      url += `&lookUpParentID=${lookUpParentID}`;
    }
    return this.http.get<LookUpDataResponse>(url,).pipe(
      catchError(this.handleError)
    );
  }

  insert(model: InsertRequest): Observable<any> {
    return this.http.post<InsertResponse>(`${endpoint()}forms/insert`, model).pipe(
      catchError(this.handleError)
    );
  }

  insertComplementary(model: InsertRequestComplementary): Observable<any> {
    return this.http.post<InsertComplementaryResponse>(`${endpoint()}forms/insertComplementary`, model).pipe(
      catchError(this.handleError)
    );
  }

  insertRequestAttachment(model: InsertRequestAttachment, file: File): Observable<any> {
    const formData: FormData = this.toFormData(model);
    formData.append('file', file);
    return this.http.post<InsertRequestAttachmentResponse>(`${endpoint()}forms/insertRequestAttachment`, formData).pipe(
      catchError(this.handleError)
    );
  }

  toFormData<T extends Record<string, any>>(obj: T): FormData {
    const formData = new FormData();
    Object.entries(obj).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (value instanceof File || value instanceof Blob) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        // Append the entire array as a JSON string
        formData.append(key, JSON.stringify(value));
      } else if (typeof value === 'object') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    });
    return formData;
  }

  logout(): Observable<any> {
    return this.http.post<BaseResult<boolean>>(`${endpoint()}resource/logout`, null)
      .pipe(catchError(this.handleError),
        map((d: BaseResult<boolean>) => {
          this.authService.logout();
          return d.data;
        }));
  }

  insertComplementary_WorkDisability(model: BreakdownRequest): Observable<any> {
    return this.http.post<BaseResult<BreakdownRequest>>(`${endpoint()}forms/insertComplementary_WorkDisability`, model).pipe(
      catchError(this.handleError)
    );
  }

  InsertRequestComplementary_Burial(model: DeathAidRequest): Observable<any> {
    return this.http.post<BaseResult<DeathAidRequest>>(`${endpoint()}forms/insertComplementary_Burial`, model).pipe(
      catchError(this.handleError)
    );
  }

  InsertRequestComplementary_Illness(model: GrandInAidRequest): Observable<any> {
    return this.http.post<BaseResult<GrandInAidRequest>>(`${endpoint()}forms/insertComplementary_Illness`, model).pipe(
      catchError(this.handleError)
    );
  }

  InsertRequestComplementary_PhysicalDisability(model: DisabilityAidRequest): Observable<any> {
    return this.http.post<BaseResult<DisabilityAidRequest>>(`${endpoint()}forms/insertComplementary_PhysicalDisability`, model).pipe(
      catchError(this.handleError)
    );
  }

  InsertRequestComplementary_IntroduceToEducationalPlace(model: EducationalIntroductionRequest): Observable<any> {
    return this.http.post<BaseResult<EducationalIntroductionRequest>>(`${endpoint()}forms/insertComplementary_IntroduceToEducationalPlace`, model).pipe(
      catchError(this.handleError)
    );
  }

  InsertRequestComplementary_IntroduceToSportsVenue(model: SportIntroductionRequest): Observable<any> {
    return this.http.post<BaseResult<SportIntroductionRequest>>(`${endpoint()}forms/insertComplementary_IntroduceToSportsVenue`, model).pipe(
      catchError(this.handleError)
    );
  }

  InsertRequestComplementary_NursingExpenses(model: NursingHelpRequest): Observable<any> {
    return this.http.post<BaseResult<NursingHelpRequest>>(`${endpoint()}forms/insertComplementary_NursingExpenses`, model).pipe(
      catchError(this.handleError)
    );
  }

  InsertRequestComplementary_MarriageLoan(model: MarriageLoanRequest): Observable<any> {
    return this.http.post<BaseResult<MarriageLoanRequest>>(`${endpoint()}forms/insertComplementary_MarriageLoan`, model).pipe(
      catchError(this.handleError)
    );
  }

  handleError<T>(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.log(error.error);
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('خطای نامشخص، لطفاً لحظاتی دیگر تلاش نمایید.');
  }
}
