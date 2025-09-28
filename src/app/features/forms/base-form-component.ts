import {Directive, inject, OnDestroy} from '@angular/core';
import {BaseComponent} from '../../base-component';
import {ActivatedRoute} from '@angular/router';
import {PersonInfo} from '../../core/models/PersonInfoResponse';
import {RestApiService} from '../../core/rest-api.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Helpers} from '../../core/helpers';
import {RequestTypeAttachment, RequestTypeAttachmentResponse} from '../../core/models/RequestTypeAttachmentResponse';
import * as moment from 'jalali-moment';

@Directive()
export class BaseFormComponent extends BaseComponent implements OnDestroy {
  private sub: any;
  private sub3: any;
  activatedRoute = inject(ActivatedRoute);
  restApiService = inject(RestApiService);
  helpers = inject(Helpers);
  toaster = inject(ToastrService);
  fb = inject(FormBuilder);
  form!: FormGroup;
  personInfo: PersonInfo | null = null;
  requestTypeID: string = '';
  requestTypes: RequestTypeAttachment[] = [];

  constructor() {
    super();
    this.sub = this.activatedRoute.params.subscribe(({id}) => {
      this.requestTypeID = id;
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
  }

  createForm(): void {
  }

  toGeorgianDate(date: string) {
    return moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY-MM-DD');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub3.unsubscribe();
  }
}
