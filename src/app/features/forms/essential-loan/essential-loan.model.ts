export interface EssentialLoanRequest {
  facilityAmount: number;
  defaultInstalementCount: number;
  facilityInstalementAmount: number;
  description: string;
  attachments: Attachment[];
}

export interface Attachment {
  type: string;
  uploaded: boolean;
}
