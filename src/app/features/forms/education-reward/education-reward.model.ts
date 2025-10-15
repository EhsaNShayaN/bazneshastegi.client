export interface EducationRewardRequest {
  prizeReceiver: string;
  attachments: Attachment[];
}

export interface Attachment {
  type: string;
  uploaded: boolean;
}
