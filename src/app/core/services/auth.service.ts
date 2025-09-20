import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {CustomConstants} from '../constants/custom.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${CustomConstants.endpoint}/auth`; // آدرس بک‌اند

  constructor(private http: HttpClient,
              private router: Router,
              public jwtHelper: JwtHelperService) {
  }

  // ورود کاربر و ذخیره JWT
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((res) => {
          if (res.token) {
            localStorage.setItem('token', res.token);
          }
        })
      );
  }

  // دریافت توکن
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // بررسی ورود کاربر
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token; // فقط چک می‌کنه که توکن باشه
  }

  // بررسی ورود کاربر
  isAdmin(): boolean {
    if (!this.isLoggedIn()) {
      return false;
    }
    return this.userInRole('superadmin') || this.userInRole('admin');
  }

  userInRole(role: string): boolean {
    const token = this.getToken()!;
    const decodedToken = this.jwtHelper.decodeToken(token);
    const roles = decodedToken.role?.split(',');
    return !!roles.find((s: string) => s.toLowerCase() === role);
  }

  // خروج کاربر
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
