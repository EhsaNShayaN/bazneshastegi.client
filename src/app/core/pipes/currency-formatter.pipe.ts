import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'currencyFormatter',
  standalone: false,
})
export class CurrencyFormatterPipe implements PipeTransform {
  transform(value: any): string {
    const ceilVal = Math.ceil(value).toString();
    return this.comfy(ceilVal);
  }

  comfy(num: string): string {
    const str = num.toString().split('.');
    if (str[0].length >= 3) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
  }
}
