import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserPanelRoutingModule} from './user-panel-routing-module';
import {UserPanel} from './user-panel';
import {Dashboard} from './dashboard/dashboard';
import {Orders} from './orders/orders';
import {Warranty} from './warranty/warranty';
import {Service} from './service/service';
import {Repair} from './repair/repair';
import {Invoice} from './invoice/invoice';
import {SharedModule} from '../../shared/shared-module';

@NgModule({
  declarations: [
    UserPanel,
    Dashboard,
    Orders,
    Warranty,
    Service,
    Repair,
    Invoice
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserPanelRoutingModule
  ]
})
export class UserPanelModule {
}
