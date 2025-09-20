export interface UrgentLoanRequest {
  requestedAmount: number;
  installmentCount: number;
  receivedDate?: string;
  receivedAmount?: number;
  remainingAmount?: number;
  lastInstallmentDate?: string;
  installmentAmount?: number;
  description?: string;
  attachments: Attachment[];
}

export interface Attachment {
  type: string;
  uploaded: boolean;
}
