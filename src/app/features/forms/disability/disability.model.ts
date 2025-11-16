import {Attachment} from '../model';

export interface DisabilityRequest {
  prizeReceiver: string;
  attachments: Attachment[];
}
