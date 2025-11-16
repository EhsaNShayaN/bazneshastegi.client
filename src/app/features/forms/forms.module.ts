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
import {FuneralAidComponent} from './funeral-aid/funeral-aid.component';
import {DisabilityComponent} from './disability/disability.component';
import {DisabilityAllowanceComponent} from './disability-allowance/disability-allowance.component';
import {SpecialIllnessAllowanceComponent} from './special-illness-allowance/special-illness-allowance.component';
import {EducationalIntroductionLetterComponent} from './educational-introduction-letter/educational-introduction-letter.component';
import {SportsIntroductionLetterComponent} from './sports-introduction-letter/sports-introduction-letter.component';

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
    FuneralAidComponent,
    DisabilityComponent,
    DisabilityAllowanceComponent,
    SpecialIllnessAllowanceComponent,
    EducationalIntroductionLetterComponent,
    SportsIntroductionLetterComponent,
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
    FuneralAidComponent,
    DisabilityComponent,
    DisabilityAllowanceComponent,
    SpecialIllnessAllowanceComponent,
    EducationalIntroductionLetterComponent,
    SportsIntroductionLetterComponent,
  ]
})
export class FormsSharedModule {
}
