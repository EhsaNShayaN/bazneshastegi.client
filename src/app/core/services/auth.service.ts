import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {
  }

  // ورود کاربر و ذخیره JWT
  login(token: string): void {
    localStorage.setItem('token', token);
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

  // خروج کاربر
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
