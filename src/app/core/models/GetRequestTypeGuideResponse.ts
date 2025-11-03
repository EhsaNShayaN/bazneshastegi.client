import {BaseResult} from './BaseResult';

export interface GetRequestTypeGuideResponse extends BaseResult<GetRequestTypeGuide[]> {
}

export interface GetRequestTypeGuide {
  requestTypeID: string;
  guideText: string;
  requestTypeName: number;
}
