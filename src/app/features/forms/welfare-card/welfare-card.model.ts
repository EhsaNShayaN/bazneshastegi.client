import {Attachment} from '../model';

export interface WelfareCardRequest {
  issueTypeLookupID: string;
  facilityReceiveTypeLookupID: string;
  facilityReceiverFullName: string;
  previousCardNumber: string;
  requestDescription: string;
  attachments: Attachment[];
}
