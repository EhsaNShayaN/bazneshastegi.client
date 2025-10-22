import {Component} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.html',
  styleUrl: './admin-header.scss',
  standalone: false
})
export class AdminHeader {
  constructor(private auth: AuthService) {
  }

  logout() {
    this.auth.logout();
  }
}
