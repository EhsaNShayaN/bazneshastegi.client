import {UntypedFormGroup, UntypedFormControl} from '@angular/forms';

export function emailValidator(control: UntypedFormControl): { [key: string]: any } | null {
  const emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  if (control.value && !emailRegexp.test(control.value)) {
    return {invalidEmail: true};
  }
  return null;
}

export function urlValidator(control: UntypedFormControl): { [key: string]: any } | null {
  const urlRegexp = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
  if (control.value && !urlRegexp.test(control.value)) {
    return {invalidUrl: true};
  }
  return null;
}

export function mobileValidator(control: UntypedFormControl): { [key: string]: any } | null {
  const urlRegexp = /^9[0-9]{9}$/i;
  let mobile = control.value;
  if (!mobile) {
    return null;
  }
  mobile = mobile.replace(/\+/gi, '').replace(/-/gi, '').replace(/ /gi, '');
  if (mobile.startsWith('0')) {
    mobile = mobile.substring(1, mobile.length);
  }
  if (mobile.startsWith('0')) {
    mobile = mobile.substring(1, mobile.length);
  }
  if (mobile.startsWith('98')) {
    mobile = mobile.substring(2, mobile.length);
  }
  if (!urlRegexp.test(mobile)) {
    return {invalidMobile: true};
  }
  return null;
}

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
  return (group: UntypedFormGroup) => {
    const password = group.controls[passwordKey];
    const passwordConfirmation = group.controls[passwordConfirmationKey];
    if (password.value !== passwordConfirmation.value) {
      return passwordConfirmation.setErrors({mismatchedPasswords: true});
    }
  };
}
