import {BaseResult} from './BaseResult';

export interface CalculateMedicalTreatmentCostResponse extends BaseResult<CalculateMedicalTreatmentCostInfo[]> {
}

export interface CalculateMedicalTreatmentCostInfo {
  requestTypeConfigID: string | null;
  requestTypeID: string;
  lookupID: number;
  defaultAmount: number;
  deliveryCost?: number;
  defaultInstalementCount: number | null;
  defaultDiscountPercent: number | null;
  profitOrDiscountPercent: number | null;
  guarantorCost: number | null;
  validationStartDate: string;
  facilityReceiverRelationshipID: string | null;
  pensionaryStatusCategory: string | null;
  genderLookupID: number | null;
  isActive: boolean;
  requestTypeName: string;
  lookupName: string;
  facilityReceiverRelationshipName: string | null;
  pensionaryStatusCategoryName: string | null;
  genderName: string | null;
  defaultInstalementAmount: number | null;
}
