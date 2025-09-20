import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FaqRoutingModule} from './faq-routing-module';
import {Faq} from './faq';
import {SharedModule} from '../../shared/shared-module';


@NgModule({
  declarations: [
    Faq
  ],
  imports: [
    CommonModule,
    SharedModule,
    FaqRoutingModule,
  ]
})
export class FaqModule {
}
