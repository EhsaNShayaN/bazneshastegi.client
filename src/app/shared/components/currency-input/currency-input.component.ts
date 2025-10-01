import {Component, ElementRef, forwardRef, Input, OnInit, Optional, Self} from '@angular/core';
import {ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';
import {CustomCurrencyPipe} from '../../../core/pipes/custom-currency.pipe';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  standalone: false,
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: CurrencyInputComponent
    },
  ]
})
export class CurrencyInputComponent implements ControlValueAccessor, OnInit, MatFormFieldControl<any> {
  @Input() placeholder: string = '';
  @Input() enable: boolean = true;
  @Input() innerFormGroupName: string = '';
  @Input() required: boolean = false;
  value: string = '';

  // MatFormFieldControl properties
  static nextId = 0;
  id = `app-currency-input-${CurrencyInputComponent.nextId++}`;
  stateChanges = new Subject<void>();
  focused = false;
  empty = true;
  shouldLabelFloat = true;
  errorState = false;

  private persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  private georgianDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  onChange = (val: any) => {
  };
  onTouched = () => {
  };

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl,
    private currencyPipe: CustomCurrencyPipe) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  disabled: boolean = false;
  controlType?: string | undefined;
  autofilled?: boolean | undefined;
  userAriaDescribedBy?: string | undefined;
  disableAutomaticLabeling?: boolean | undefined;
  describedByIds?: string[] | undefined;

  setDescribedByIds(ids: string[]): void {
  }

  ngOnInit(): void {
    // If required input is provided, add required validator
    if (this.required && this.control) {
      const validators = this.control.validator ? [this.control.validator] : [];
      this.control.setValidators(validators);
      this.control.updateValueAndValidity();
    }
  }

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

  onFocus() {
    this.focused = true;
    this.stateChanges.next();
  }

  onBlur() {
    this.focused = false;
    this.onTouched();
    this.stateChanges.next();
  }

  onContainerClick(event: MouseEvent): void {
    // Focus the input when the form field is clicked
    const input = this.elementRef.nativeElement.querySelector('input');
    if (input) {
      input.focus();
    }
  }

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
  }

  get formGroup() {
    return this.ngControl?.control?.parent as FormGroup;
  }

  get innerFormGroup() {
    return this.ngControl?.control?.parent?.get(this.innerFormGroupName) as FormGroup;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  // Add this method to get the formControlName
  get formControlName(): string | null {
    if (!this.ngControl?.control?.parent) return null;

    const formGroup = this.ngControl.control.parent as FormGroup;

    // Find the control name by comparing the control instance
    for (const [name, control] of Object.entries(formGroup.controls)) {
      if (control === this.ngControl.control) {
        return name;
      }
    }

    return null;
  }
}
