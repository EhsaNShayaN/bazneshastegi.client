import {BaseInsertRequestComplementary} from '../pay-fraction-certificate/pay-fraction-certificate.model';

export interface BreakdownRequest extends BaseInsertRequestComplementary {
  requestComplementaryID: string;
  relatedPersonID: string;
  requestDescription: string;
}
