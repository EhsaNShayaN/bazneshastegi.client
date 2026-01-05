import {Component} from '@angular/core';
import {BaseFormComponent} from '../base-form-component';

@Component({
  selector: 'app-new-related',
  templateUrl: './new-related.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class NewRelatedComponent extends BaseFormComponent {
  constructor() {
    super();
    this.relationColumnsToDisplay = this.relationColumnsToDisplay.filter(s => s.key !== 'check');
    this.relationColumnsToDisplay0 = this.relationColumnsToDisplay.map(s => s.key);
    this.getRelations();
  }
}
