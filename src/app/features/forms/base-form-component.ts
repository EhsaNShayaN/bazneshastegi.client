import {Directive, inject, OnDestroy, ViewChild} from '@angular/core';
import {BaseComponent} from '../../base-component';
import {ActivatedRoute} from '@angular/router';
import {PersonInfo} from '../../core/models/PersonInfoResponse';
import {RestApiService} from '../../core/rest-api.service';
import {ToastrService} from 'ngx-toastr';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Helpers} from '../../core/helpers';
import {RequestTypeAttachment, RequestTypeAttachmentResponse} from '../../core/models/RequestTypeAttachmentResponse';
import * as moment from 'jalali-moment';
import {DatePipe} from '@angular/common';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ActiveFacilitiesOfPerson, ActiveFacilitiesOfPersonResponse} from '../../core/models/ActiveFacilitiesOfPersonResponse';
import {InsertRequest, InsertRequestAttachment, InsertRequestComplementary} from './pay-fraction-certificate/pay-fraction-certificate.model';
import {InsertRequestAttachmentResponse} from '../../core/models/InsertRequestAttachmentResponse';
import {CustomConstants} from '../../core/constants/custom.constants';
import {RelatedPersonsResponse} from '../../core/models/RelatedPersonsResponse';
import {MatRadioChange} from '@angular/material/radio';
import {InsertInfo, InsertResponse} from '../../core/models/InsertResponse';
import {InsertComplementaryResponse} from '../../core/models/InsertComplementaryResponse';
import {Observable} from 'rxjs';
import {BaseResult} from '../../core/models/BaseResult';

@Directive()
export class BaseFormComponent extends BaseComponent implements OnDestroy {
  message: string = '';
  dataSource: MatTableDataSource<ActiveFacilitiesOfPerson> | null = null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null = null;
  @ViewChild(MatSort, {static: true}) sort: MatSort | null = null;
  totalCount = 0;
  relationColumnsToDisplay = [
    //{key: 'pensionaryID', name: 'شناسه'},
    //{key: 'personFatherName', name: 'نام پدر'},
    //{key: 'personLastName', name: 'نام خانوادگی'},
    {key: 'personID', name: 'شماره پرسنلی'},
    {key: 'personFirstName', name: 'نام و نام خانوادگی'},
    {key: 'personNationalCode', name: 'کدملی'},
    {key: 'check', name: 'انتخاب'},
  ];
  relationColumnsToDisplay0: string[] = this.relationColumnsToDisplay.map(s => s.key);
  relationDataSource: MatTableDataSource<any> | null = null;
  relatedPersonIDError: boolean = false;
  relatedPerson: any;
  relatedPersonID: string = '';

  private sub: any;
  private sub3: any;
  activatedRoute = inject(ActivatedRoute);
  restApiService = inject(RestApiService);
  helpers = inject(Helpers);
  toaster = inject(ToastrService);
  datePipe = inject(DatePipe);
  fb = inject(FormBuilder);
  form!: FormGroup;
  personInfo: PersonInfo | null = null;
  requestTypeID: string = '';
  requestTypes: RequestTypeAttachment[] = [];

  //requestTypeGuide?: GetRequestTypeGuide;

  constructor() {
    super();
    this.sub = this.activatedRoute.params.subscribe(({id}) => {
      this.restApiService.formSubmittedSubject.next('');
      this.requestTypeID = id;
      this.restApiService.getActiveFacilitiesOfPerson(this.requestTypeID).subscribe((a: ActiveFacilitiesOfPersonResponse) => {
        this.initDataSource(a);
        this.sub3 = this.restApiService.personInfoSubject.subscribe(personInfo => {
          if (personInfo) {
            this.personInfo = personInfo;
            this.restApiService.getRequestTypeAttachment(this.requestTypeID).subscribe((b: RequestTypeAttachmentResponse) => {
              if (b.isSuccess) {
                this.requestTypes = b.data;
                this.createForm();
              }
            });
          }
        });
      });
      this.helpers.setPaginationLang();
    });
  }

  createForm(): void {
  }

  initDataSource(res: any) {
    this.totalCount = res.data.length;
    this.dataSource = new MatTableDataSource<ActiveFacilitiesOfPerson>(res.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getRelations() {
    this.restApiService.getRelatedPersons().subscribe((res: RelatedPersonsResponse) => {
      this.relationDataSource = new MatTableDataSource<any>(res.data);
    });
  }

  convertToGeorgianDate(date: string): string {
    return moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY-MM-DD');
  }

  convertToPersianDate(date: string) {
    return moment.from(date, 'YYYY-MM-DD')
      .locale('fa')          // switch to Persian locale
      .format('jYYYY/jMM/jDD'); // use "j" for Jalali calendar
  }

  onFileSelected(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      console.log('Selected file for', this.attachments.at(index).get('type')?.value, file);

      // mark as uploaded
      this.attachments.at(index).patchValue({uploaded: true, file: file});
      this.attachments.at(index).get('file')?.markAsTouched();
    }
  }

  get attachments(): FormArray {
    return this.form.get('attachments') as FormArray;
  }

  insertAttachments(requestID: string, requestNO: string) {
    const lastIndex = this.attachments.controls.length - 1;
    for (let i = 0; i < this.attachments.controls.length; i++) {
      const attachment = this.attachments.at(i).getRawValue();
      if (attachment.file) {
        const requestTypeAttachment = attachment.obj as RequestTypeAttachment;
        const insertRequestAttachment: InsertRequestAttachment = {
          requestID: requestID,
          attachementTypeID: requestTypeAttachment.requestTypeAttachmentID,
          attachementTypeName: requestTypeAttachment.lookupName,
          insertUserID: requestTypeAttachment.insertUserID,
          insertTime: requestTypeAttachment.insertTime,
          updateUserID: requestTypeAttachment.updateUserID,
          updateTime: requestTypeAttachment.updateTime,
        };
        this.restApiService.insertRequestAttachment(insertRequestAttachment, attachment.file).subscribe((c: InsertRequestAttachmentResponse) => {
          console.log(c);
          if (i === lastIndex) {
            this.showResult(requestNO);
          }
        });
      }
    }
  }

  checkRelatedUser($event: MatRadioChange) {
    this.relatedPersonID = $event.source.value;
    this.relatedPersonIDError = !this.relatedPersonID;
    this.relatedPerson = this.relationDataSource?.data.find(s => s.personID === this.relatedPersonID);
  }

  showResult(requestNO: string) {
    this.message = `متقاضی گرامی درخواست شما با شماره پیگیری ${requestNO} در سامانه ثبت گردید. جهت مشاهده مراحل بررسی درخواست از طریق منوی پیگیری درخواست اقدام فرمایید.`;
    this.restApiService.formSubmittedSubject.next(this.message);
    this.toaster.success(CustomConstants.THE_OPERATION_WAS_SUCCESSFUL, '', {});
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.customFunction();
  }

  customFunction() {

  }

  send(insert: InsertRequest, insertComplementary: InsertRequestComplementary) {
    this.restApiService.insert(insert).subscribe((a: InsertResponse) => {
      if (a.isSuccess) {
        console.log(a);
        insertComplementary.requestID = a.data.requestID;
        this.restApiService.insertComplementary(insertComplementary).subscribe((b: InsertComplementaryResponse) => {
          console.log(b);
          if (b.isSuccess) {
            if ((this.attachments.controls?.length ?? 0) > 0) {
              this.insertAttachments(a.data.requestID, a.data.requestNO);
            } else {
              this.showResult(a.data.requestNO);
            }
          } else {
            this.toaster.error(b.errors[0]?.errorMessage ?? 'خطای نامشخص', 'خطا', {});
          }
        });
      } else {
        this.toaster.error(a.errors[0]?.errorMessage ?? 'خطای نامشخص', 'خطا', {});
      }
    });
  }

  insert(insert: InsertRequest): Promise<InsertResponse | null> {
    return new Promise(resolve => {
      this.restApiService.insert(insert).subscribe((a: InsertResponse) => {
        if (a.isSuccess) {
          resolve(a);
        } else {
          this.toaster.error(a.errors[0]?.errorMessage ?? 'خطای نامشخص', 'خطا');
          resolve(null);
        }
      });
    });
  }

  call<T>(insert: InsertInfo, obs: Observable<any>) {
    obs.subscribe((b: BaseResult<T>) => {
      console.log(b);
      if (b.isSuccess) {
        if ((this.attachments.controls?.length ?? 0) > 0) {
          this.insertAttachments(insert.requestID, insert.requestNO);
        } else {
          this.showResult(insert.requestNO);
        }
      } else {
        this.toaster.error(b.errors[0]?.errorMessage ?? 'خطای نامشخص', 'خطا', {});
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub3.unsubscribe();
  }
}
