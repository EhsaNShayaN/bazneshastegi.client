import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {AuthService} from './auth.service';
import {ToastrService} from 'ngx-toastr';
import {SKIP_INTERCEPTOR} from './http-context.tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService,
              private toaster: ToastrService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const skip = req.context.get(SKIP_INTERCEPTOR);
    if (skip) {
      return next.handle(req);
    }
    const token = this.auth.getToken();
    let cloned: HttpRequest<any> = req;
    if (token) {
      cloned = req.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });
    }
    return next.handle(cloned).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            const responseBody = event.body;
            if (responseBody?.isSuccess) {
            } else {
              if (responseBody.errors?.length > 0) {
                for (const error of responseBody.errors) {
                  console.error('error', error);
                  //console.log(error.errorCode, error.errorMessage);
                  this.toaster.error(error.errorMessage, error.errorCode, {});
                }
              }
            }
          }
        },
        error: (error: HttpErrorResponse) => {
          //console.error('❌ API Error:', cloned.url, error.message);
        }
      })
    );
  }
}
