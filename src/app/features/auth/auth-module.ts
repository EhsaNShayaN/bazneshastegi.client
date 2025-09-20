import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing-module';
import {Auth} from './auth';
import {Login} from './login/login';
import {Register} from './register/register';
import {ForgotPassword} from './forgot-password/forgot-password';
import {SharedModule} from '../../shared/shared-module';

@NgModule({
  declarations: [
    Auth,
    Login,
    Register,
    ForgotPassword
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
  ]
})
export class AuthModule {
}
