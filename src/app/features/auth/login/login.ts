import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {mobileValidator} from '../../../core/utils/app-validators';
import {PureComponent} from '../../../pure-component';
import {RestApiService} from '../../../core/rest-api.service';
import {Router} from '@angular/router';
import {LoginForPortalResponse} from '../../../core/models/LoginForPortalResponse';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: false,
})
export class Login extends PureComponent {
  form: FormGroup;

  constructor(private restApiService: RestApiService,
              private router: Router,
              private fb: FormBuilder,
              private auth: AuthService) {
    super();
    this.form = this.fb.group({
      nationalCode: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      cellPhone: [null, Validators.compose([Validators.required, mobileValidator])],
    });
  }

  onSubmit() {
    console.log('onSubmit');
    if (this.form.valid) {
      const {nationalCode, cellPhone} = this.form.value;
      // ارسال به سرویس ورود...
      this.restApiService.loginForPortal(nationalCode, cellPhone).subscribe((b: LoginForPortalResponse) => {
        if (b.data) {
          this.auth.login(b.data.token);
          this.router.navigate(['/']);
        }
      });
    } else {
      this.form.markAllAsTouched();
      console.log(this.findInvalidControls(this.form));
    }
  }
}
