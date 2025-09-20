import {Directive, HostListener, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appInputRestriction]',
  standalone: false
})
export class InputRestrictionDirective {
  @Input() appInputRestriction: string | undefined;

  public inputElement: ElementRef;
  public arabicRegex = '[\u0600-\u06FF]';

  constructor(el: ElementRef) {
    this.inputElement = el;
  }

  /**
   * Instructions for use before using on the <input appInputRestriction="xxx">
   * appInputRestriction="int"
   * appInputRestriction="float"
   * appInputRestriction="noSpecialChars"
   * appInputRestriction="noSpecialCharsExcept" (".", "-", "_")
   * appInputRestriction="noSpecialCharsPassUrl"
   * appInputRestriction="noInputAndPaste"
   */

  @HostListener('keypress', ['$event']) onKeyPress(event: any) {
    if (this.appInputRestriction === 'int') {
      this.intOnly(event); // 1,3,5 ..
    } else if (this.appInputRestriction === 'float') {
      this.floatOnly(event); // eg: 2.3 , 4.7 ...
    } else if (this.appInputRestriction === 'noSpecialChars') {
      this.noSpecialChars(event); // a-z, A-Z, 0-9
    } else if (this.appInputRestriction === 'noSpecialCharsExcept') {
      this.noSpecialCharsExcept(event); // Does not contain special characters except (".", "-", "_")
    } else if (this.appInputRestriction === 'noSpecialCharsPassUrl') {
      this.noSpecialCharsPassUrl(event); // No special chars # and &
    } else if (this.appInputRestriction === 'noInputAndPaste') {
      this.noInputAndPaste(event);
    }
  }

  public intOnly(event: any): void {
    const e = event as KeyboardEvent;
    const code = (e.which) ? e.which : e.keyCode;
    // 8: Backspace, 9: Tab , 13: Enter, 27: Escape
    if ([8, 9, 13, 27].indexOf(code) !== -1 || (code === 65 && e.ctrlKey) || (code === 67 && e.ctrlKey) || (code === 86 && e.ctrlKey) || (code === 88 && e.ctrlKey)) {
      // let it happen, don't do anything
      return;
    }
    if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].indexOf(e.key) === -1) {
      e.preventDefault();
    }
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

  public noSpecialChars(event: any): void {
    const e = event as KeyboardEvent;
    const code = (e.which) ? e.which : e.keyCode;
    // 8: Backspace, 9: Tab, 13: Enter, 27: Escape, 32: Space
    if ([8, 9, 13, 27, 32].indexOf(code) !== -1
      || (code > 64 && code < 91)
      || (code > 96 && code < 123)
      || (code >= 48 && code <= 57)) {
      // let it happen, don't do anything
      return;
    }
    const ch = String.fromCharCode(code);
    const regEx = new RegExp(this.arabicRegex);
    if (regEx.test(ch)) {
      return;
    }
    e.preventDefault();
  }

  // Does not contain special characters except (".", "-", "_")
  public noSpecialCharsExcept(event: any): void {
    const e = event as KeyboardEvent;
    const code = (e.which) ? e.which : e.keyCode;
    // 8: Backspace, 9: Tab, 13: Enter, 27: Escape, 32: Space, 45: “-”, 46: ”.”, 95: “_”
    if ([8, 9, 13, 27, 32, 45, 46, 95].indexOf(code) !== -1
      || (code > 64 && code < 91)
      || (code > 96 && code < 123)
      || (code >= 48 && code <= 57)) {
      // let it happen, don't do anything
      return;
    }
    const ch = String.fromCharCode(code);
    const regEx = new RegExp(this.arabicRegex);
    if (regEx.test(ch)) {
      return;
    }
    e.preventDefault();
  }

  public noSpecialCharsPassUrl(event: any): void {
    const e = event as KeyboardEvent;
    const code = (e.which) ? e.which : e.keyCode;
    if (e.key === 'Tab' || e.key === 'TAB') {
      return;
    }
    // No special chars # and &
    if (code === 35 || code === 38) {
      e.preventDefault();
    } else {
      return;
    }
  }

  public noInputAndPaste(event: any): void {
    const e = event as KeyboardEvent;
    e.preventDefault();
  }

  @HostListener('paste', ['$event']) onPaste(event: any) {
    const e = event as ClipboardEvent;
    let regex;
    if (this.appInputRestriction === 'int') {
      regex = /[0-9]/g;
    } else if (this.appInputRestriction === 'float') {
      regex = /[0-9.]/g;
    } else if (this.appInputRestriction === 'noSpecialChars') {
      regex = /[a-zA-Z0-9\u0600-\u06FF]/g;
    } else if (this.appInputRestriction === 'noSpecialCharsExcept') {
      regex = /[a-zA-Z0-9 (\-)._]/g; // allow ”.”, “-”, “_”
    } else if (this.appInputRestriction === 'noSpecialCharsPassUrl') {
      regex = /[a-zA-Z0-9 ~!@$%^*(\\\/\-['`;=+\]),.?":{}|<>_]/g; // No # and &
    } else if (this.appInputRestriction === 'noInputAndPaste') {
      e.preventDefault();
    }
    const pasteData = e.clipboardData?.getData('text/plain');
    let m;
    let matches = 0;
    while ((m = regex?.exec(pasteData ?? '')) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m?.index === regex?.lastIndex) {
        if (regex) regex.lastIndex++;
      }
      // The result can be accessed through the `m`-variable.
      m?.forEach((match, groupIndex) => {
        matches++;
      });
    }
    if (matches === pasteData?.length) {
      return;
    } else {
      e.preventDefault();
    }
  }
}
