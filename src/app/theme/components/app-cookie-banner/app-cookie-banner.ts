import {Component} from '@angular/core';
import {RestApiService} from '../../../core/rest-api.service';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-cookie-banner',
  imports: [
    MatButton
  ],
  template: `
    <div class="cookie-banner">
      <span>
        «ما از کوکی‌ها برای بهبود تجربه شما استفاده می‌کنیم.»
      </span>

      <button mat-raised-button color="accent" (click)="accept()">
        تائید
      </button>
    </div>
  `
})
export class CookieBannerComponent {

  constructor(private restApiService: RestApiService) {
  }

  accept() {
    this.restApiService.setCookieConsent()
      .subscribe(() => {
        // hide banner after backend sets cookie
        location.reload();
      });
  }
}
