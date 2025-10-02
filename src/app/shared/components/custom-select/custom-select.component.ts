import {Component, Input, Output, EventEmitter, Optional, Self} from '@angular/core';
import {ControlValueAccessor, Validator, AbstractControl, ValidationErrors, NgControl} from '@angular/forms';

export interface SelectItem {
  id: any;
  name: string;
}

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.scss',
  /*providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    }
  ],*/
  standalone: false
})
export class CustomSelectComponent implements ControlValueAccessor, Validator {
  @Input() items: SelectItem[] = [];
  @Input() placeholder: string = 'Select';
  @Input() required: boolean = false;

  @Output() selectionChange = new EventEmitter<any>();

  searchTerm: string = '';
  filteredItems: SelectItem[] = [];

  value: any;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this; // 👈 Hook into Angular Forms
    }
  }

  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  ngOnInit() {
    this.filteredItems = this.items;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // handle disabled if needed
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.required && !this.value) {
      return {required: true};
    }
    return null;
  }

  filterItems() {
    const term = this.searchTerm.toLowerCase();
    this.filteredItems = this.items.filter(item => item.name.toLowerCase().includes(term));
  }

  onSelectionChange(event: any) {
    this.value = event.value;
    this.onChange(this.value);
    this.selectionChange.emit(this.value);
  }

  onOpenedChange($event: boolean) {

  }
}
