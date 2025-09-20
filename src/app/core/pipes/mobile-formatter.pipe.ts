import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Pipe({
  name: 'mobileFormatter',
  standalone: false
})
export class MobileFormatterPipe implements PipeTransform {

  transform(value: any): string {
    return this.validateMobile(value);
  }

  validateMobile(mobile: string): string {
    const regex = /^9[0-9]{9}$/i;
    if (mobile !== '' && mobile != null) {
      mobile = mobile.replace(/\+/gi, '').replace(/-/gi, '').replace(/ /gi, '');
      if (mobile.startsWith('0')) {
        mobile = mobile.substring(1, mobile.length);
      }
      if (mobile.startsWith('0')) {
        mobile = mobile.substring(1, mobile.length);
      }
      if (mobile.startsWith('98')) {
        mobile = mobile.substring(2, mobile.length);
      }
      if (regex.test(mobile)) {
        return mobile;
      }
    }
    return '';
  }
}
