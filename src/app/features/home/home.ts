import {Component, OnInit} from '@angular/core';
import {RestApiService} from '../../core/rest-api.service';
import {RequestType, RequestTypeResponse} from '../../core/models/RequestTypeResponse';
import {MatSelectChange} from '@angular/material/select';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  requestTypes: RequestType[] = [];

  constructor(private restApiService: RestApiService,
              private router: Router) {
  }

  ngOnInit() {
    this.restApiService.getRequestTypes().subscribe((a: RequestTypeResponse) => {
      this.requestTypes = a.data;
    });
  }

  selectForm($event: MatSelectChange<RequestType>) {
    const requestType = $event.value;
    const url = `/forms/${requestType.page.toLowerCase()}/${requestType.requestTypeID}`;
    this.router.navigate([url]).then(() => {
    });
  }
}
