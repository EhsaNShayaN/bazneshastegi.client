import {Attachment} from '../model';

export interface SportsIntroductionLetterRequest {
  prizeReceiver: string;
  attachments: Attachment[];
}
