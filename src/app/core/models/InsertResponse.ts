import {BaseResult} from "./BaseResult";

export interface InsertResponse extends BaseResult<InsertInfo> {
}

export interface InsertInfo {
  requestID: string;
  personID: string;
  nationalCode: string;
  personFirstName: string;
  personLastName: string;
  requestDate: string; // ISO datetime string e.g. "2025-09-18T11:18:27.321Z"
  requestTypeID: string;
  requestText: string;
  insertUserID: string;
  updateUserID?: string | null;
  requestFrom: number;
  state: number;
  stateName?: string | null;
  requestTypeName?: string | null;
  requestTypeNameFa?: string | null;
  requestNO: string;
  conditionValue: number;
  isLocked: boolean;
  lockedUserID?: string | null;
  page?: string | null;
  conditions?: ConditionInfo[] | null;
}

export interface ConditionInfo {
  conditionValue: number;
  nextSate: number;
  buttonName: string;
}
