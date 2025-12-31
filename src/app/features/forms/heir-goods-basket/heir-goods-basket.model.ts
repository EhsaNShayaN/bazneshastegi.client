import {BaseInsertRequestComplementary} from '../pay-fraction-certificate/pay-fraction-certificate.model';

export interface HeirGoodsBasketRequest extends BaseInsertRequestComplementary {
  requestID: string,
  loginedPersonID: string,
  basketReceiveTypeID: string
  thisPersonID: string

  personAddress: string;
  personPostalCode: string;
  personRegion: number;
  personArea: number;
  personPhone: string;
  personCellPhone: string;
}
