import {BaseInsertRequestComplementary} from '../pay-fraction-certificate/pay-fraction-certificate.model';

export interface ImprestRequest extends BaseInsertRequestComplementary {
  requestComplementaryID: string;
  requestDescription: string;
  facilityAmount: number;
}
