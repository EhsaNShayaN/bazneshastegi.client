import {BaseInsertRequestComplementary} from '../pay-fraction-certificate/pay-fraction-certificate.model';

export interface NursingHelpRequest extends BaseInsertRequestComplementary {
  requestComplementaryID: string;
  relatedPersonID: string;
  requestDescription: string;
  issueTypeLookupID: string;
}
