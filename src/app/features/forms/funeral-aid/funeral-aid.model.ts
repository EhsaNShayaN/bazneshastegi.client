import {Attachment} from '../model';

export interface FuneralAidRequest {
  prizeReceiver: string;
  attachments: Attachment[];
}
