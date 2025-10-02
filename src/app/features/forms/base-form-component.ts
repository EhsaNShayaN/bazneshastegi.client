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
import {CustomCurrencyPipe} from '../../core/pipes/custom-currency.pipe';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ActiveFacilitiesOfPerson, ActiveFacilitiesOfPersonResponse} from '../../core/models/ActiveFacilitiesOfPersonResponse';
import {RelatedPersons} from '../../core/models/RelatedPersonsResponse';

@Directive()
export class BaseFormComponent extends BaseComponent implements OnDestroy {
  dataSource: MatTableDataSource<any> | null = null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null = null;
  @ViewChild(MatSort, {static: true}) sort: MatSort | null = null;
  totalCount = 0;

  private sub: any;
  private sub3: any;
  activatedRoute = inject(ActivatedRoute);
  restApiService = inject(RestApiService);
  helpers = inject(Helpers);
  toaster = inject(ToastrService);
  datePipe = inject(DatePipe);
  fb = inject(FormBuilder);
  customCurrency = inject(CustomCurrencyPipe);
  form!: FormGroup;
  personInfo: PersonInfo | null = null;
  requestTypeID: string = '';
  requestTypes: RequestTypeAttachment[] = [];

  constructor() {
    super();
    this.sub = this.activatedRoute.params.subscribe(({id}) => {
      this.requestTypeID = id;
      this.restApiService.getActiveFacilitiesOfPerson(this.requestTypeID).subscribe((a: ActiveFacilitiesOfPersonResponse) => {
        this.initDataSource(a);
      });
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
      this.helpers.setPaginationLang();
    });
  }

  createForm(): void {
  }

  public initDataSource(res: any) {
    this.totalCount = res.data.length;
    this.dataSource = new MatTableDataSource<any>(res.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
      this.attachments.at(index).patchValue({uploaded: true});
    }
  }

  get attachments(): FormArray {
    return this.form.get('attachments') as FormArray;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub3.unsubscribe();
  }
}
