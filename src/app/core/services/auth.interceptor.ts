import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();
    if (token) {
      const cloned = req.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });
      return next.handle(cloned);
    }
    const lang = localStorage.getItem('lang') ?? 'fa';
    req = req.clone({
      headers: req.headers.set('Accept-Language', lang),
    });
    return next.handle(req);
  }
}
