export interface EssentialLoanRequest {
  facilityAmount: number;
  defaultInstalementCount: number;
  facilityInstalementAmount: number;
  requestDescription: string;
  referralToCommittee?: boolean;
  attachments: Attachment[];
}

export interface Attachment {
  type: string;
  uploaded: boolean;
}
