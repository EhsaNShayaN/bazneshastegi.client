import {Attachment} from '../model';

export interface HealthBookletRequest {
  issueTypeLookupID: string;
  facilityReceiveTypeLookupID: string;
  attachments: Attachment[];
}
