import {Directive} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';

@Directive()
export class PureComponent {
  findInvalidControls(myForm: UntypedFormGroup) {
    const invalid = [];
    const controls = myForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
}
