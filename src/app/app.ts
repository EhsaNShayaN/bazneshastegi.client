import {Component, OnInit} from '@angular/core';
import {AppSettings, Settings} from './app.settings';
import {BaseResult} from './core/models/BaseResult';
import {RestApiService} from './core/rest-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: false,
})
export class App implements OnInit {
  public settings: Settings;
  showCookieBanner = false;

  constructor(
    public appSettings: AppSettings,
    private restApiService: RestApiService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.restApiService.getCookieConsentStatus()
      .subscribe((result: BaseResult<{ accepted: boolean }>) => {
        this.showCookieBanner = !result.data.accepted;
      });
  }
}
