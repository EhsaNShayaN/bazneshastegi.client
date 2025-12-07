import {BaseInsertRequestComplementary} from '../pay-fraction-certificate/pay-fraction-certificate.model';

export interface MarriageLoanRequest extends BaseInsertRequestComplementary {
  requestComplementaryID: string;
  relatedPersonID: string;
  requestDescription: string;
  facilityAmount: number;
  facilityInstalementCount: number;
  profitOrDiscountPercent: number;
  facilityInstalementAmount: number;
}
