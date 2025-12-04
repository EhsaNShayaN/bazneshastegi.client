import {BaseInsertRequestComplementary} from '../pay-fraction-certificate/pay-fraction-certificate.model';

export interface EducationalIntroductionRequest extends BaseInsertRequestComplementary {
  requestComplementaryID: string;
  relatedPersonID: string;
  requestDescription: string;
  facilityGiverLookupID: string;
  facilityGiverDesc: string;
  profitOrDiscountPercent: 0;
}
