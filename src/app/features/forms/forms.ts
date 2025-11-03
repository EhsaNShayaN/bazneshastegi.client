import {Component, OnDestroy, OnInit} from '@angular/core';
import {PureComponent} from '../../pure-component';
import {PersonInfo, PersonInfoResponse} from '../../core/models/PersonInfoResponse';
import {RestApiService} from '../../core/rest-api.service';
import {RequestType, RequestTypeResponse} from '../../core/models/RequestTypeResponse';
import {MatSelectChange} from '@angular/material/select';
import {Router} from '@angular/router';
import {GetRequestTypeGuide, GetRequestTypeGuideResponse} from '../../core/models/GetRequestTypeGuideResponse';
import {MatDialog} from '@angular/material/dialog';
import {DialogContentComponent} from '../dialog-content/dialog-content.component';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.html',
  standalone: false
})
export class Forms extends PureComponent implements OnInit, OnDestroy {
  sub: any;
  message: string = '';
  personInfo: PersonInfo | null = null;
  requestTypes: RequestType[] = [];
  selectedRequestTypeId: string = '';
  requestTypeGuide?: GetRequestTypeGuide;

  constructor(private router: Router,
              private restApiService: RestApiService,
              private dialog: MatDialog) {
    super();
    this.restApiService.getPersonInfo().subscribe((b: PersonInfoResponse) => {
      this.personInfo = b.data;
    });
    const pathArray = window.location.pathname.split('/');
    if (pathArray.length === 4) {
      this.selectedRequestTypeId = pathArray[3];
      this.restApiService.getRequestTypeGuide(this.selectedRequestTypeId).subscribe((g: GetRequestTypeGuideResponse) => {
        if (g.data.length > 0) {
          this.requestTypeGuide = g.data[0];
        }
      });
    }
    this.sub = this.restApiService.formSubmittedSubject.subscribe(msg => {
      this.message = msg;
    });
  }

  ngOnInit() {
    this.restApiService.getRequestTypes().subscribe((a: RequestTypeResponse) => {
      this.requestTypes = a.data;
    });
  }

  selectForm($event: MatSelectChange<string>) {
    const requestType = this.requestTypes.find(s => s.requestTypeID === $event.value);
    if (requestType) {
      console.log('selectForm');
      this.restApiService.formSubmittedSubject.next('');
      this.router.navigate([`/forms/${requestType.page}/${requestType.requestTypeID}`]).then(() => {
      });
    }
  }

  openHelpDialog() {
    this.dialog.open(DialogContentComponent, {
      width: '400px',
      data: {title: this.requestTypeGuide?.requestTypeName, content: this.requestTypeGuide?.guideText}
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
