import {BaseResult} from './BaseResult';

export interface GetRequestTypeConfigResponse extends BaseResult<RequestTypeConfigInfo[]> {
}

export interface RequestTypeConfigInfo {
  requestTypeConfigID: string | null;
  requestTypeID: string;
  lookupID: number;
  defaultAmount: number;
  deliveryCost?: number;
  defaultInstalementCount: number | null;
  defaultDiscountPercent: number | null;
  guarantorCost: number | null;
  validationStartDate: string;
  facilityReceiverRelationshipID: number | null;
  pensionaryStatusCategory: string | null;
  genderLookupID: number | null;
  isActive: boolean;
  requestTypeName: string;
  lookupName: string;
  facilityReceiverRelationshipName: string | null;
  pensionaryStatusCategoryName: string | null;
  genderName: string | null;
}
