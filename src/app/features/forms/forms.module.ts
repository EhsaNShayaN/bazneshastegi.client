import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';

import {PayFractionCertificateComponent} from './pay-fraction-certificate/pay-fraction-certificate.component';
import {SalaryCertificateComponent} from './salary-certificate/salary-certificate.component';
import {StationaryComponent} from './stationary/stationary.component';
import {EducationRewardComponent} from './education-reward/education-reward.component';
import {CityBankLoanComponent} from './city-bank-loan/city-bank-loan.component';
import {EssentialLoanComponent} from './essential-loan/essential-loan.component';
import {TreatmentBookletComponent} from './treatment-booklet/treatment-booklet.component';
import {WelfareCardComponent} from './welfare-card/welfare-card.component';
import {CeremonyIntroductionComponent} from './ceremony-introduction/ceremony-introduction.component';
import {FormsRoutingModule} from './forms-routing-module';
import {SharedModule} from '../../shared/shared-module';
import {RelationsComponent} from './relations/relations.component';
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

@NgModule({
  declarations: [
    PayFractionCertificateComponent,
    SalaryCertificateComponent,
    StationaryComponent,
    EducationRewardComponent,
    CityBankLoanComponent,
    EssentialLoanComponent,
    TreatmentBookletComponent,
    WelfareCardComponent,
    CeremonyIntroductionComponent,
    RelationsComponent,
    BreakdownComponent,
    SpecialIllnessAllowanceComponent,
    DeathAidComponent,
    DisabilityAidComponent,
    GrandInAidComponent,
    EducationalIntroductionComponent,
    SportIntroductionComponent,
    NursingHelpComponent,
    MarriageLoanComponent,
    MariageAidComponent,
    RetiredGoodsBasketComponent,
    HeirGoodsBasketComponent,
    ImprestComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    FormsRoutingModule,
  ],
  exports: [
    PayFractionCertificateComponent,
    SalaryCertificateComponent,
    StationaryComponent,
    EducationRewardComponent,
    CityBankLoanComponent,
    EssentialLoanComponent,
    TreatmentBookletComponent,
    WelfareCardComponent,
    CeremonyIntroductionComponent,
    RelationsComponent,
    BreakdownComponent,
    SpecialIllnessAllowanceComponent,
    DeathAidComponent,
    DisabilityAidComponent,
    GrandInAidComponent,
    EducationalIntroductionComponent,
    SportIntroductionComponent,
    NursingHelpComponent,
    MarriageLoanComponent,
    MariageAidComponent,
    RetiredGoodsBasketComponent,
    HeirGoodsBasketComponent,
    ImprestComponent,
  ]
})
export class FormsSharedModule {
}
