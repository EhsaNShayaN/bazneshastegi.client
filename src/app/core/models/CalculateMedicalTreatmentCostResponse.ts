import {BaseResult} from './BaseResult';

export interface CalculateMedicalTreatmentCostResponse extends BaseResult<CalculateMedicalTreatmentCostInfo[]> {
}

export interface CalculateMedicalTreatmentCostInfo {
  serviceCost: number | null;
  deliveryCost: number | null;
  serviceDiscount: number | null;
  serviceCountOfInstalement: number | null;
  messageForUser: number | null;
}
