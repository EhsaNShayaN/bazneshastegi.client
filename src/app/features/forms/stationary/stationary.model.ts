export interface StationaryRequest {
  prizeReceiver: string;
  attachments: Attachment[];
}

export interface Attachment {
  type: string;
  uploaded: boolean;
}
