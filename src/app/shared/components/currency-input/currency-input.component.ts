import {Component, EventEmitter, HostListener, Input, Optional, Output, Self, ViewChild} from '@angular/core';
import {ControlValueAccessor, NgControl, Validator} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {CustomCurrencyPipe} from '../../../core/pipes/custom-currency.pipe';

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  standalone: false
})
export class CurrencyInputComponent implements ControlValueAccessor, Validator {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() class: string = 'w-100';
  @Input() disabled: boolean = false;

  @Output() changed = new EventEmitter<number>();
  @Output() keyPressed = new EventEmitter<KeyboardEvent>();
  @Output() keyUpEvent = new EventEmitter<KeyboardEvent>();

  @ViewChild(MatInput, {static: true}) matInput!: MatInput;

  constructor(@Optional() @Self() public ngControl: NgControl,
              private customCurrency: CustomCurrencyPipe) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this; // 👈 Hook into Angular Forms
    }
  }

  value: string = '';

  private onChange: any = () => {
  };
  private onTouched: any = () => {
  };

  writeValue(value: any): void {
    if (value !== undefined && value !== null) {
      this.value = this.formatValue(value);
    } else {
      this.value = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate() {
    return this.ngControl?.errors || null;
  }

  onInput(event: Event): void {
    const value = this.customCurrency.transform((event.target as HTMLInputElement).value);
    const numValue = parseFloat(value.replace(/[^0-9.]/g, '') || '0');
    this.value = this.formatValue(numValue);
    this.onChange(numValue);
    this.changed.emit(numValue);
  }

  onBlur(): void {
    this.onTouched();
  }

  @HostListener('keypress', ['$event'])
  handleKeyPress(event: KeyboardEvent): void {
    this.keyPressed.emit(event);
  }

  @HostListener('keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent): void {
    this.keyUpEvent.emit(event);
  }

  private formatValue(value: number | string): string {
    return this.customCurrency.transform(value);
  }
}
