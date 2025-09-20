export interface RequestTypeResponse {
  data: RequestType[];
}

export interface RequestType {
  requestTypeID: string; // Guid در C# → string در TS
  name: string;
  startState: number;
  workFlowName: string;
  userView: boolean;
  role: string;
  natoinalCodeIsMandentory: boolean;
  page: string;
  requestFrom: number;
}
