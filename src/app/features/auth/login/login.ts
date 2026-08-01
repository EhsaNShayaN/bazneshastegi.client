import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {mobileValidator} from '../../../core/utils/app-validators';
import {PureComponent} from '../../../pure-component';
import {RestApiService} from '../../../core/rest-api.service';
import {Router} from '@angular/router';
import {LoginForPortalResponse} from '../../../core/models/LoginForPortalResponse';
import {AuthService} from '../../../core/services/auth.service';
import {environment} from '../../../../environments/environment';
import {SubmitLoadingDirective} from '../../../core/directives/submit-loading.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: false,
})
export class Login extends PureComponent implements OnInit {
  form: FormGroup;
  @ViewChild('btn') btn!: SubmitLoadingDirective;
  captchaId = '';
  captchaImage = '';

  constructor(private restApiService: RestApiService,
              private router: Router,
              private fb: FormBuilder,
              private auth: AuthService) {
    super();
    this.form = this.fb.group({
      nationalCode: [environment.production ? '' : '0045723702', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      cellPhone: [environment.production ? '' : '09121017503', Validators.compose([Validators.required, mobileValidator])],
      captcha: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadCaptcha();
  }

  loadCaptcha() {
    this.restApiService.generateCaptcha('').subscribe(x => {
      this.captchaId = x.id;
      this.captchaImage = x.image;
    });
  }

  startLoading() {
    this.btn.startLoading();
  }

  stopLoading() {
    this.btn.stopLoading();
  }

  onSubmit() {
    if (this.form.valid) {
      this.startLoading();
      const values = this.form.value;
      this.restApiService.loginForPortal(values.nationalCode, values.cellPhone, values.captcha, this.captchaId)
        .subscribe((b: LoginForPortalResponse) => {
          if (b.data) {
            this.auth.login(b.data.token);
            this.router.navigate(['/']);
          } else {
            this.loadCaptcha();
            this.stopLoading();
          }
        }, (err) => {
          this.loadCaptcha();
          this.stopLoading();
        });
    } else {
      this.form.markAllAsTouched();
      console.log(this.findInvalidControls(this.form));
    }
  }
}
