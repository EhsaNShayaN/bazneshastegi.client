import {BaseResult} from './BaseResult';

export interface RequestTypeAttachmentResponse extends BaseResult<RequestTypeAttachment[]> {
}

export interface RequestTypeAttachment {
  requestTypeAttachmentID: string;
  requestTypeID: string;
  lookupID: string;
  lookupName: string;
  mandantory: boolean;
  insertUserID: string;
  insertTime: string;
  updateUserID?: string;
  updateTime?: string;
}
