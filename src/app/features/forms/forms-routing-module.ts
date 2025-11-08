import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CeremonyIntroductionComponent} from './ceremony-introduction/ceremony-introduction.component';
import {CityBankLoanComponent} from './city-bank-loan/city-bank-loan.component';
import {TreatmentBookletComponent} from './treatment-booklet/treatment-booklet.component';
import {SalaryCertificateComponent} from './salary-certificate/salary-certificate.component';
import {EducationRewardComponent} from './education-reward/education-reward.component';
import {StationaryComponent} from './stationary/stationary.component';
import {EssentialLoanComponent} from './essential-loan/essential-loan.component';
import {WelfareCardComponent} from './welfare-card/welfare-card.component';
import {PayFractionCertificateComponent} from './pay-fraction-certificate/pay-fraction-certificate.component';

const routes: Routes = [
  {path: 'ceremony-introduction/:id', component: CeremonyIntroductionComponent},
  {path: 'city-bank-loan/:id', component: CityBankLoanComponent},
  {path: 'treatment-booklet/:id', component: TreatmentBookletComponent},
  {path: 'salary-certificate/:id', component: SalaryCertificateComponent},
  {path: 'pay-fraction-certificate/:id', component: PayFractionCertificateComponent},
  {path: 'education-reward/:id', component: EducationRewardComponent},
  {path: 'stationary/:id', component: StationaryComponent},
  {path: 'essential-loan/:id', component: EssentialLoanComponent},
  {path: 'welfare-card/:id', component: WelfareCardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule {
}
