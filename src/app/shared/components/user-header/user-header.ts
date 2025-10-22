import {Component} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.html',
  styleUrl: './user-header.scss',
  standalone: false
})
export class UserHeader {
  constructor(private auth: AuthService) {
  }

  logout() {
    this.auth.logout();
  }
}
