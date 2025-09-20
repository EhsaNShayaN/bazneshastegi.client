import {Injectable} from '@angular/core';

export class Settings {
  constructor(public name: string,
              public theme: string,
              public toolbar: number,
              public stickyMenuToolbar: boolean,
              public header: string,
              public rtl: boolean,
              public searchPanelVariant: number,
              public mainToolbarFixed: boolean,
              public contentOffsetToTop: boolean,
              public loadMore: {
                start: boolean,
                step: number,
                load: boolean,
                page: number,
                complete: boolean,
                result: number
              },
              public email: string,
              public mobile: string
  ) {
  }
}

@Injectable()
export class AppSettings {
  public settings = new Settings(
    'Bazneshastegi',  // theme name
    'green-custom',
    1,           // 1 or 2 or 3
    true,        // true = sticky, false = not sticky
    'carousel',     // default, image, carousel, map, video
    true,       // true = rtl, false = ltr
    2,           //  1, 2  or 3
    false,
    false,
    {
      start: false,
      step: 1,
      load: false,
      page: 1,
      complete: false,
      result: 0
    },
    'info@bazneshastegi.com',
    '021-xxx'
  );
}
