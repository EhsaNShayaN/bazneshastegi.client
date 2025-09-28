import {BaseResult} from "./BaseResult";

export interface RequestTypeAttachmentResponse extends BaseResult<RequestTypeAttachment[]> {
}

export interface RequestTypeAttachment {
  requestTypeAttachmentID: string;  // GUID
  requestTypeID: string;            // GUID
  lookupID: string;                 // can be string or number if always numeric
  lookupName: string;
  mandantory: boolean;
  insertUserID: string;
  insertTime: string;               // ISO date string
  updateUserID?: string | null;
  updateTime?: string | null;       // ISO date string
}

