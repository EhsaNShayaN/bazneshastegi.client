import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {endpoint} from './services/cookie-utils';
import {AddResourceRequest, Resource, ResourceRequest, ResourceResponse, ResourcesRequest} from './models/ResourceResponse';
import {AddResult, BaseResult} from './models/BaseResult';
import {ResourceCategoriesResponse} from './models/ResourceCategoryResponse';
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
      catchError(this.handleError)
    );
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
