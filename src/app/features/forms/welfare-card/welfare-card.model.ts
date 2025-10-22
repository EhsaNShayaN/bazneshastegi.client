export interface WelfareCardRequest {
  issueTypeLookupID: string;
  facilityReceiveTypeLookupID: string;
  facilityReceiverFullName: string;
  previousCardNumber: string;
  attachments: Attachment[];
}

export interface Attachment {
  type: string;
  uploaded: boolean;
}
