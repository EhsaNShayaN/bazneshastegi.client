import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: 'input[onlyFloatNumber]',
  standalone: false
})
export class OnlyFloatNumberDirective {
  constructor() {
  }

  @HostListener('keypress', ['$event']) onInputChange(e: any) {
    this.floatOnly(e);
    /*if (e.target.value.length === 0 && e.which === 48) {
      return false;
    }

    const verified = String.fromCharCode(e.which).match(/[^0-9.]/g);
    if (verified) {
      e.preventDefault();
      return false;
    }*/
  }

  public floatOnly(event: any): void {
    const e = event as KeyboardEvent;
    const code = (e.which) ? e.which : e.keyCode;
    // 8: Backspace, 9: Tab , 13: Enter, 27: Escape, 46: "."
    if ([8, 9, 13, 27, 46].indexOf(code) !== -1 || (code === 65 && e.ctrlKey) || (code === 67 && e.ctrlKey) || (code === 86 && e.ctrlKey) || (code === 88 && e.ctrlKey)) {
      // let it happen, don't do anything
      return;
    }
    if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].indexOf(e.key) === -1) {
      e.preventDefault();
    }
  }
}
