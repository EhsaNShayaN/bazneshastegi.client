export interface SalaryCertificate {
  facilityGiverDesc: string;
  payAmount: number;
  requestType: string;
  retirementDate?: string;
  retiredRealDuration?: number;
  includeSalary: boolean;
  includeHistory: boolean;
}
