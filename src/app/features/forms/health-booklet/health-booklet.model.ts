export interface HealthBookletRequest {
  issueTypeLookupID: string;
  facilityReceiveTypeLookupID:string;
  attachments: Attachment[];
}

export interface Attachment {
  type: string;
  uploaded: boolean;
}
