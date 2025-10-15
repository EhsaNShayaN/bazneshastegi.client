export interface CityBankLoanRequest {
  branchName: string;
  requestedAmount: number;
  lastInstallmentDate?: string;
  receivedDate?: string;
  receivedAmount?: number;
  remainingAmount?: number;
  description?: string;
  needGuarantor: boolean;
  guarantorCost?: number;
}
