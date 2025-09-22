import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserLayout} from './shared/layouts/user-layout/user-layout';
import {Pages} from './features/pages';
import {Forms} from './features/forms/forms';
import {AuthGuard} from './core/guards/auth.guard';

const pagesChildren: Routes = [
// صفحات عمومی
  {path: 'auth', loadChildren: () => import('./features/auth/auth-module').then(m => m.AuthModule)},
  {path: 'about', loadChildren: () => import('./features/about/about-module').then(m => m.AboutModule)},
  {path: 'contact', loadChildren: () => import('./features/contact/contact-module').then(m => m.ContactModule)},
  {path: 'faq', loadChildren: () => import('./features/faq/faq-module').then(m => m.FaqModule)},
  {
    path: '',
    children: [
      {path: '', loadChildren: () => import('./features/home/home-module').then(m => m.HomeModule)},
      {path: 'home', loadChildren: () => import('./features/home/home-module').then(m => m.HomeModule)},
      {
        path: 'forms',
        component: Forms, children: [{path: '', loadChildren: () => import('./features/forms/forms.module').then(m => m.FormsSharedModule)}],
      },
    ],
    canActivate: [AuthGuard]
  },
  // پنل کاربر
  {
    path: 'user',
    component: UserLayout,
    children: [
      {path: '', loadChildren: () => import('./features/user-panel/user-panel-module').then(m => m.UserPanelModule)}
    ]
  },
  // مسیر پیش‌فرض
];
const routes: Routes = [
  {
    path: '',
    component: Pages, children: pagesChildren
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
