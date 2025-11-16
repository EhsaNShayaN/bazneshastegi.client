export interface RequestTypeResponse {
  data: RequestType[];
}

export interface RequestType {
  requestTypeID: string;
  name: string;
  startState: number;
  workFlowName: string;
  userView: boolean;
  role: string;
  natoinalCodeIsMandentory: boolean;
  page: string;
  requestFrom: number;
}
