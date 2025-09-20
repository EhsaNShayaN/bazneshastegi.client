import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactRoutingModule} from './contact-routing-module';
import {Contact} from './contact';
import {SharedModule} from '../../shared/shared-module';

@NgModule({
  declarations: [
    Contact
  ],
  imports: [
    CommonModule,
    SharedModule,
    ContactRoutingModule,
  ]
})
export class ContactModule {
}
