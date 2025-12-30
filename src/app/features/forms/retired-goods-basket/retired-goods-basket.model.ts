import {BaseInsertRequestComplementary} from '../pay-fraction-certificate/pay-fraction-certificate.model';

export interface RetiredGoodsBasketRequest extends BaseInsertRequestComplementary {
  requestID: string,
  loginedPersonID: string,
  basketReceiveTypeID: string
}
