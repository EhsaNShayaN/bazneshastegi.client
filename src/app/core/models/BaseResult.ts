export class BaseResult<T> {
  code: ResultStatusCode = ResultStatusCode.OK;
  errors: string[] = [];
  data: T;

  constructor(code: ResultStatusCode, data: T) {
    this.code = code;
    this.data = data;
  }
}

export enum ResultStatusCode {
  OK = 200,
  BadRequest = (400),
  Unauthorized = (401),
  Forbidden = (403),
  NotFound = (404),
  NotAcceptable = (406),
  Conflict = (409),
  UnhandledException = (500)
}

export interface AddResult {
  changed: boolean;
}
