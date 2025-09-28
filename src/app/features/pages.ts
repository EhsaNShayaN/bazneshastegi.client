import {isPlatformBrowser} from '@angular/common';
import {Component, HostListener, Inject, PLATFORM_ID, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AppSettings, Settings} from '../app.settings';
import {PureComponent} from '../pure-component';
import {PersonInfo, PersonInfoResponse} from '../core/models/PersonInfoResponse';
import {RestApiService} from '../core/rest-api.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.html',
  styleUrl: './pages.scss',
  standalone: false
})
export class Pages extends PureComponent {
  @ViewChild('sidenav') sidenav: any;
  public toolbarTypeOption: number;
  public headerTypeOption: string;
  public searchPanelVariantOption: number;
  public showBackToTop = false;
  public scrolledCount = 0;
  public settings: Settings;
  personInfo: PersonInfo | null = null;

  constructor(public appSettings: AppSettings,
              public router: Router,
              private restApiService: RestApiService,
              @Inject(PLATFORM_ID) private platformId: any) {
    super();
    this.settings = this.appSettings.settings;
    this.toolbarTypeOption = this.settings.toolbar;
    this.headerTypeOption = this.settings.header;
    this.searchPanelVariantOption = this.settings.searchPanelVariant;
    this.restApiService.getPersonInfo().subscribe((b: PersonInfoResponse) => {
      this.personInfo = b.data;
    });
  }

  @HostListener('window:scroll') onWindowScroll() {
    const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
    (scrollTop > 300) ? this.showBackToTop = true : this.showBackToTop = false;

    if (this.settings.stickyMenuToolbar) {
      const topToolbar = document.getElementById('top-toolbar');
      if (topToolbar) {
        this.settings.mainToolbarFixed = scrollTop > topToolbar.clientHeight;
      }
    }

    const loadMore = document.getElementById('load-more');
    if (loadMore) {
      if (window.innerHeight > loadMore.getBoundingClientRect().top + 120) {
        if (!this.settings.loadMore.complete) {
          if (this.settings.loadMore.start) {
            if (this.scrolledCount < this.settings.loadMore.step) {
              this.scrolledCount++;
              if (!this.settings.loadMore.load) {
                this.settings.loadMore.load = true;
              }
            } else {
              this.settings.loadMore.start = false;
              this.scrolledCount = 0;
            }
          }
        }
      }
    }
  }

  public scrollToTop() {
    const scrollDuration = 200;
    const scrollStep = -window.pageYOffset / (scrollDuration / 20);
    const scrollInterval = setInterval(() => {
      if (window.pageYOffset !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 10);
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo(0, 0);
        }
      });
    }
  }

  activateComponent(cmp: any) {
  }
}
