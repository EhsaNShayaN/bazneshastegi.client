import {BaseInsertRequestComplementary} from '../pay-fraction-certificate/pay-fraction-certificate.model';

export interface GrandInAidRequest extends BaseInsertRequestComplementary {
  requestComplementaryID: string;
  relatedPersonID: string;
  requestDescription: string;
  hasWelfareCertificate: true;
  illnessHistory: number;
}
