export interface StationaryRequest {
  loanAmount: number;
  prizeReceiver: string;
  attachments: Attachment[];
}

export interface Attachment {
  type: string;
  uploaded: boolean;
}
