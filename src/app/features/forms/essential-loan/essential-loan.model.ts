import {Attachment} from '../model';

export interface EssentialLoanRequest {
  facilityAmount: number;
  defaultInstalementCount: number;
  facilityInstalementAmount: number;
  requestDescription: string;
  referralToCommittee?: boolean;
  attachments: Attachment[];
}
