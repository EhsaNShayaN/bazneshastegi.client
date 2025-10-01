import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'customCurrency',
  standalone: false
})
export class CustomCurrencyPipe implements PipeTransform {

  private persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

  transform(value: string | number | null | undefined, usePersianDigits: boolean = false): string {
    if (value === null || value === undefined) return '';

    let str = value.toString().replace(/\D/g, '');
    if (!str) return '';

    // add comma separator
    str = str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    if (usePersianDigits) {
      str = str.replace(/\d/g, d => this.persianDigits[+d]);
    }

    return str;
  }
}
