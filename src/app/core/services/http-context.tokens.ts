import {HttpContextToken} from '@angular/common/http';

export const SKIP_INTERCEPTOR = new HttpContextToken<boolean>(() => false);
