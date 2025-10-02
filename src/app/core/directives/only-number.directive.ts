import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: 'input[onlyNumber]',
  standalone: false
})
export class OnlyNumberDirective {
  private persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

  constructor() {
  }

  @HostListener('keypress', ['$event']) onInputChange(e: any) {
    const verified = String.fromCharCode(e.which).match(/[^0-9]/g);
    if (verified) {
      e.preventDefault();
      return false;
    }
    return true;
  }
}
