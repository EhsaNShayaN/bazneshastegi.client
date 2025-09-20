export interface LookUpDataResponse {
  data: LookUpData[];
}

export interface LookUpData {
  lookUpID: number;
  lookUpType: string;
  lookUpTypeName: string;
  lookUpName: string;
  lookUpParentID?: string | null;
  lookUpDescription?: string | null;
  lookUpParentIDName?: string | null;
  isDeleted: boolean;
}
