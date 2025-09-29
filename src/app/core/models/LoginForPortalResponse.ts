import {BaseResult} from './BaseResult';

export interface LoginForPortalResponse extends BaseResult<LoginForPortal> {
}

export class LoginForPortal {
  token!: string;
}
