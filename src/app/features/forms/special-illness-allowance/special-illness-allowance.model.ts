import {Attachment} from '../model';

export interface SpecialIllnessAllowanceRequest {
  prizeReceiver: string;
  attachments: Attachment[];
}
