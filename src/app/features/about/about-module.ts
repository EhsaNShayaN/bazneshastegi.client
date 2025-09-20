import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutRoutingModule} from './about-routing-module';
import {About} from './about';
import {SharedModule} from '../../shared/shared-module';

@NgModule({
  declarations: [
    About
  ],
  imports: [
    CommonModule,
    SharedModule,
    AboutRoutingModule,
  ]
})
export class AboutModule {
}
