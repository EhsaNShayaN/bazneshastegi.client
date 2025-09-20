import {Directive, inject, OnDestroy, OnInit} from '@angular/core';
import {BaseComponent} from '../../base-component';
import {ActivatedRoute} from '@angular/router';
import {PersonInfo, PersonInfoResponse} from '../../core/models/PersonInfoResponse';
import {RestApiService} from '../../core/rest-api.service';
import {BehaviorSubject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Directive()
export class BaseFormComponent extends BaseComponent implements OnInit, OnDestroy {
  private sub: any;
  sub2: any;
  activatedRoute = inject(ActivatedRoute);
  restApiService = inject(RestApiService);
  toaster = inject(ToastrService);
  personInfo: PersonInfo | null = null;
  requestTypeID: string = '';
  personInfoSubject: BehaviorSubject<PersonInfo | null> = new BehaviorSubject<PersonInfo | null>(null);

  constructor() {
    super();
    this.restApiService.getPersonInfo('R78').subscribe((b: PersonInfoResponse) => {
      this.personInfo = b.data;
      this.personInfoSubject.next(b.data);
    });
  }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(({id}) => {
      this.requestTypeID = id;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
}
