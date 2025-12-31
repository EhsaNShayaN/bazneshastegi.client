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
import {BreakdownComponent} from './breakdown/breakdown.component';
import {SpecialIllnessAllowanceComponent} from './special-illness-allowance/special-illness-allowance.component';
import {DeathAidComponent} from './death-aid/death-aid.component';
import {DisabilityAidComponent} from './disability-aid/disability-aid.component';
import {GrandInAidComponent} from './grandIn-aid/grandIn-aid.component';
import {EducationalIntroductionComponent} from './educational-introduction/educational-introduction.component';
import {SportIntroductionComponent} from './sport-introduction/sport-introduction.component';
import {NursingHelpComponent} from './nursing-help/nursing-help.component';
import {MarriageLoanComponent} from './marriage-loan/marriage-loan.component';
import {MariageAidComponent} from './mariage-aid/mariage-aid.component';
import {RetiredGoodsBasketComponent} from './retired-goods-basket/retired-goods-basket.component';
import {HeirGoodsBasketComponent} from './heir-goods-basket/heir-goods-basket.component';
import {ImprestComponent} from './imprest/imprest.component';

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
  {path: 'breakdown/:id', component: BreakdownComponent},
  {path: 'special-illness-allowance/:id', component: SpecialIllnessAllowanceComponent},
  {path: 'deathaid/:id', component: DeathAidComponent},
  {path: 'disabilityaid/:id', component: DisabilityAidComponent},
  {path: 'grandinaid/:id', component: GrandInAidComponent},
  {path: 'educational-introduction/:id', component: EducationalIntroductionComponent},
  {path: 'sport-introduction/:id', component: SportIntroductionComponent},
  {path: 'nursinghelp/:id', component: NursingHelpComponent},
  {path: 'marriage-loan/:id', component: MarriageLoanComponent},
  {path: 'mariageaid/:id', component: MariageAidComponent},
  {path: 'retired-goods-basket/:id', component: RetiredGoodsBasketComponent},
  {path: 'heired-goods-basket/:id', component: HeirGoodsBasketComponent},
  {path: 'imprest/:id', component: ImprestComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule {
}
