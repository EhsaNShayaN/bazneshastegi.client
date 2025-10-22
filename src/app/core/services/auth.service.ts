import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenName: string = 'bazneshastegi';

  constructor(private router: Router) {
  }

  // ورود کاربر و ذخیره JWT
  login(token: string): void {
    localStorage.setItem(this.tokenName, token);
  }

  // دریافت توکن
  getToken(): string | null {
    return localStorage.getItem(this.tokenName);
  }

  // بررسی ورود کاربر
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token; // فقط چک می‌کنه که توکن باشه
  }

  // خروج کاربر
  logout(): void {
    localStorage.removeItem(this.tokenName);
    this.router.navigate(['/']);
  }
}
