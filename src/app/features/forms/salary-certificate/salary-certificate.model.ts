export interface SalaryCertificate {
  organization: string;
  payAmount: number;
  requestType: string;
  retirementDate?: string;
  retiredRealDuration?: number;
  includeSalary: boolean;
  includeHistory: boolean;
}
