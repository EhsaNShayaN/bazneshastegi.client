import {BaseInsertRequestComplementary} from '../pay-fraction-certificate/pay-fraction-certificate.model';

export interface SportIntroductionRequest extends BaseInsertRequestComplementary {
  requestComplementaryID: string;
  relatedPersonID: string;
  requestDescription: string;
  facilityGiverLookupID: string;
  facilityGiverDesc: string;
  profitOrDiscountPercent: 0;
}
