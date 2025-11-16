import {Attachment} from '../model';

export interface EducationalIntroductionLetterRequest {
  prizeReceiver: string;
  attachments: Attachment[];
}
