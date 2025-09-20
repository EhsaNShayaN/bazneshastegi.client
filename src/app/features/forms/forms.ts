import {Component} from '@angular/core';
import {PureComponent} from '../../pure-component';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.html',
  standalone: false
})
export class Forms extends PureComponent {
  constructor() {
    super();
  }
}
