import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Faq } from './faq';

const routes: Routes = [{ path: '', component: Faq }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqRoutingModule { }
