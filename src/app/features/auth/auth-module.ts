import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing-module';
import {Auth} from './auth';
import {Login} from './login/login';
import {Register} from './register/register';
import {ForgotPassword} from './forgot-password/forgot-password';
import {SharedModule} from '../../shared/shared-module';
import {Logout} from './logout/logout';
import {NumericCaptchaComponent} from "ngx-numeric-captcha";

@NgModule({
  declarations: [
    Auth,
    Login,
    Logout,
    Register,
    ForgotPassword
  ],
    imports: [
        CommonModule,
        SharedModule,
        AuthRoutingModule,
        NumericCaptchaComponent,
    ]
})
export class AuthModule {
}
