import {Component, OnInit} from '@angular/core';
import {PureComponent} from '../../../pure-component';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.html',
  standalone: false,
})
export class Logout extends PureComponent implements OnInit {

  constructor(private auth: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.auth.logout();
    window.location.href = '/login';
  }
}
