import {Component} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.scss',
  standalone: false
})
export class UserMenu {
  profile: any;

  constructor(public authService: AuthService) {
  }

  logout() {
    /*this.restApiService.logout().pipe(first()).subscribe((d: boolean) => {
    });*/
  }
}
