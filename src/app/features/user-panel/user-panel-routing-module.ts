import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserPanel} from './user-panel';

const routes: Routes = [{path: '', component: UserPanel}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPanelRoutingModule {
}
