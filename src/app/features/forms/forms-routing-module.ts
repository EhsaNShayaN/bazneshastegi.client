import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CeremonyIntroductionComponent} from './ceremony-introduction/ceremony-introduction.component';
import {CityBankLoanComponent} from './city-bank-loan/city-bank-loan.component';
import {HealthBookletComponent} from './health-booklet/health-booklet.component';
import {SalaryCertificateComponent} from './salary-certificate/salary-certificate.component';
import {EducationRewardComponent} from './education-reward/education-reward.component';
import {StationaryComponent} from './stationary/stationary.component';
import {UrgentLoanComponent} from './urgent-loan/urgent-loan.component';
import {WelfareCardComponent} from './welfare-card/welfare-card.component';
import {PayFractionCertificateComponent} from './pay-fraction-certificate/pay-fraction-certificate.component';

const routes: Routes = [
  {path: 'ceremony-introduction/:id', component: CeremonyIntroductionComponent},
  {path: 'city-bank-loan/:id', component: CityBankLoanComponent},
  {path: 'health-booklet/:id', component: HealthBookletComponent},
  {path: 'salary-certificate/:id', component: SalaryCertificateComponent},
  {path: 'pay-fraction-certificate/:id', component: PayFractionCertificateComponent},
  {path: 'education-reward/:id', component: EducationRewardComponent},
  {path: 'stationary/:id', component: StationaryComponent},
  {path: 'urgent-loan/:id', component: UrgentLoanComponent},
  {path: 'welfare-card/:id', component: WelfareCardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule {
}
