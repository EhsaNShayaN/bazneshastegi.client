import {Directive, inject} from '@angular/core';
import {PureComponent} from './pure-component';
import {Meta, Title} from '@angular/platform-browser';

@Directive()
export class BaseComponent extends PureComponent {
  titleService = inject(Title);
  metaService = inject(Meta);

  constructor() {
    super();
  }

  setTitle(title: string | null = null) {
    if (!title) {
      title = 'Bazneshastegi | بازنشستگی';
    }
    this.titleService.setTitle(title);
  }

  private updateMeta(property: string, content: string) {
    this.metaService.updateTag({property, content});
  }

  setMetaDescription(content: string) {
    this.updateMeta('description', content);
  }

  setMetaKeywords(content: string) {
    this.updateMeta('keywords', content);
  }
}
