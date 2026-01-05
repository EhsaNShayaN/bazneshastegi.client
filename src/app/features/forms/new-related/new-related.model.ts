import {BaseInsertRequestComplementary} from '../pay-fraction-certificate/pay-fraction-certificate.model';

export interface NewRelatedRequest extends BaseInsertRequestComplementary {
  requestID: string,
  loginedPersonID: string,
}
