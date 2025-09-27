import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Login} from './login/login';
import {Register} from './register/register';
import {ForgotPassword} from './forgot-password/forgot-password';
import {Logout} from './logout/logout';

const routes: Routes = [
  {path: '', component: Login},
  {path: 'login', component: Login},
  {path: 'logout', component: Logout},
  {path: 'register', component: Register},
  {path: 'forgot-password', component: ForgotPassword},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
