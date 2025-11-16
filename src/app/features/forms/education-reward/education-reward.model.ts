import {Attachment} from '../model';

export interface EducationRewardRequest {
  prizeReceiver: string;
  attachments: Attachment[];
}
