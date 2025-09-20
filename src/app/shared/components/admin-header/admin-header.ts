import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.html',
  styleUrl: './admin-header.scss',
  standalone: false
})
export class AdminHeader {
  constructor(private router: Router) {
  }

  logout() {
    // TODO: حذف توکن از localStorage یا سرویس Auth
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
