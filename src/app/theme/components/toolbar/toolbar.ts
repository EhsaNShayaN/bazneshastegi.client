import {Component, Output, EventEmitter, ViewChild, OnDestroy} from '@angular/core';
import {AppSettings, Settings} from '../../../app.settings';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {PureComponent} from '../../../pure-component';
import {MatMenuTrigger} from '@angular/material/menu';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
  standalone: false
})
export class Toolbar extends PureComponent implements OnDestroy {
  @Output() onMenuIconClick: EventEmitter<any> = new EventEmitter<any>();
  public subscribeForm: UntypedFormGroup;
  public settings: Settings;
  public profile: any;
  @ViewChild(MatMenuTrigger, {static: false}) trigger!: MatMenuTrigger;
  recheckIfInMenu: boolean;
  subscribe1: any;

  constructor(public appSettings: AppSettings,
              public formBuilder: UntypedFormBuilder,
              public authService: AuthService) {
    super();
    this.settings = this.appSettings.settings;
    this.recheckIfInMenu = false;
    this.subscribeForm = this.formBuilder.group({
      query: ['', Validators.required]
    });
  }

  sidenavToggle() {
    this.onMenuIconClick.emit();
  }

  openResourceMenu() {
    document.body.classList.add('open');
    this.trigger.openMenu();
  }

  closeResourceMenu() {
    setTimeout(() => {
      if (!this.recheckIfInMenu) {
        this.trigger.closeMenu();
        document.body.classList.remove('open');
      }
    }, 175);
  }

  ngOnDestroy() {
    this.subscribe1?.unsubscribe();
  }
}
