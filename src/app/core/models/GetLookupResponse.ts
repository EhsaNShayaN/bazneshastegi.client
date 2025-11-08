import {BaseResult} from './BaseResult';

export interface GetLookupResponse extends BaseResult<LookupInfo[]> {
}

export interface LookupInfo {
  lookUpID: string;
  lookUpType: string;
  lookUpTypeName: string;
  lookUpName: string;
  lookUpParentID: string;
  lookUpDescription: string;
  lookUpParentIDName: string;
  isDeleted: boolean;
}
