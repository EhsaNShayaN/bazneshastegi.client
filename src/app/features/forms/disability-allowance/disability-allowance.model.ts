import {Attachment} from '../model';

export interface DisabilityAllowanceRequest {
  prizeReceiver: string;
  attachments: Attachment[];
}
