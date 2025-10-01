import {Component, Input, Optional, Self} from '@angular/core';
import {ControlValueAccessor, FormGroup, NgControl} from '@angular/forms';
import {CustomCurrencyPipe} from '../../../core/pipes/custom-currency.pipe';

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  standalone: false,
})
export class CurrencyInputComponent implements ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() enable: boolean = true;
  @Input() innerFormGroupName: string = '';
  value: string = '';

  private persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  private georgianDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  onChange = (val: any) => {
  };
  onTouched = () => {
  };

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private currencyPipe: CustomCurrencyPipe) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  // CVA
  writeValue(val: any): void {
    if (val !== undefined && val !== null) {
      this.value = this.formatNumber(val.toString());
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Event Handlers
  onInput(event: any) {
    const raw = this.extractDigits(event.target.value);
    this.value = this.formatNumber(raw);
    this.onChange(raw);
  }

  onKeyDown(event: KeyboardEvent) {
    if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key)) return;
    if (!this.isDigit(event.key)) event.preventDefault();
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pasted = event.clipboardData?.getData('text') || '';
    const raw = this.extractDigits(pasted);
    this.value = this.formatNumber(raw);
    this.onChange(raw);
  }

  // Helpers
  private isDigit(key: string): boolean {
    return this.georgianDigits.includes(key) || this.persianDigits.includes(key);
  }

  private extractDigits(value: string): string {
    return value
      .split('')
      .map(ch => {
        const idx = this.persianDigits.indexOf(ch);
        if (idx > -1) return idx.toString();
        if (this.georgianDigits.includes(ch)) return ch;
        return '';
      })
      .join('');
  }

  private formatNumber(val: string): string {
    return this.currencyPipe.transform(val, false) || '';
  }

  get control() {
    return this.ngControl?.control;
    //return this.formGroup?.get(this.formControlName);
  }

  get innerFormGroup() {
    return this.ngControl?.control?.parent?.get(this.innerFormGroupName) as FormGroup;
  }
}
