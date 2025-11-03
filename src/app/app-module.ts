import {NgModule, provideBrowserGlobalErrorListeners} from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient} from '@angular/common/http';
import {AuthInterceptor} from './core/services/auth.interceptor';
import {MatIconRegistry} from '@angular/material/icon';
import {AppRoutingModule} from './app-routing-module';
import {App} from './app';
import {Pages} from './features/pages';
import {SharedModule} from './shared/shared-module';
import {Header} from './shared/layouts/header/header';
import {Footer} from './shared/layouts/footer/footer';
import {UserLayout} from './shared/layouts/user-layout/user-layout';
import {AdminSidebar} from './shared/components/admin-sidebar/admin-sidebar';
import {UserSidebar} from './shared/components/user-sidebar/user-sidebar';
import {AdminHeader} from './shared/components/admin-header/admin-header';
import {UserHeader} from './shared/components/user-header/user-header';
import {AppSettings} from './app.settings';
import {UrlSerializer} from '@angular/router';
import {LowerCaseUrlSerializer} from './core/pipes/lower-case-url-serializer.pipe';
import {MatMiniFabButton} from '@angular/material/button';
import {MatCardAvatar, MatCardHeader} from '@angular/material/card';
import {MatLine} from '@angular/material/core';
import {Toolbar} from './theme/components/toolbar/toolbar';
import {SocialIcons} from './theme/components/social-icons/social-icons';
import {UserMenu} from './theme/components/user-menu/user-menu';
import {JwtModule} from '@auth0/angular-jwt';
import {BidiModule} from '@angular/cdk/bidi';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Forms} from './features/forms/forms';
import {AuthGuard} from './core/guards/auth.guard';
import {DatePipe} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogContentComponent} from './features/dialog-content/dialog-content.component';

export function tokenGetter() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    App,
    Pages,
    Forms,
    Toolbar,
    SocialIcons,
    UserMenu,
    ////////////////////////////
    Header,
    Footer,
    UserLayout,
    AdminSidebar,
    UserSidebar,
    AdminHeader,
    UserHeader,
    DialogContentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BidiModule,
    AppRoutingModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: [],
      }
    }),
    MatMiniFabButton,
    MatCardAvatar,
    MatCardHeader,
    MatLine,
    MatDialogModule,
  ],
  providers: [
    DatePipe,
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    AppSettings,
    {provide: UrlSerializer, useClass: LowerCaseUrlSerializer},
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  exports: [],
  bootstrap: [App]
})
export class AppModule {
  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.iconRegistry.addSvgIcon(
      'instagram',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/instagram.svg')
    );
    this.iconRegistry.addSvgIcon(
      'linkedin',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/linkedin.svg')
    );
  }
}
