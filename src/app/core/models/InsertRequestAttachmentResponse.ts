import {BaseResult} from './BaseResult';

export interface InsertRequestAttachmentResponse extends BaseResult<InsertRequestAttachmentInfo> {
}

export interface InsertRequestAttachmentInfo {
//requestAttachmentID: string;
  requestID: string;
  attachementTypeID: string;
  attachementTypeName: string;
  //attachementDesc: string;
  //attachment: string;
  //contentType: string;
  insertUserID: string;
  insertTime: string;
  updateUserID?: string;
  updateTime?: string;
}
