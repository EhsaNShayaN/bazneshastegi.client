export interface LookUpDataResponse {
  data: LookUpData[];
}

export interface LookUpData {
  lookUpID: string;
  lookUpType: string;
  lookUpTypeName: string;
  lookUpName: string;
  lookUpParentID?: string | null;
  lookUpDescription?: string | null;
  lookUpParentIDName?: string | null;
  isDeleted: boolean;
}
