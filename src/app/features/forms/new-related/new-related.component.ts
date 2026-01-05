import {Component} from '@angular/core';
import {BaseFormComponent} from '../base-form-component';
import {MatTableDataSource} from '@angular/material/table';
import {RelatedPersonsResponse} from '../../../core/models/RelatedPersonsResponse';

@Component({
  selector: 'app-new-related',
  templateUrl: './new-related.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class NewRelatedComponent extends BaseFormComponent {
  newRelationColumnsToDisplay = [
    //{key: 'pensionaryID', name: 'شناسه'},
    //{key: 'personFatherName', name: 'نام پدر'},
    //{key: 'personLastName', name: 'نام خانوادگی'},
    {key: 'personID', name: 'شماره پرسنلی'},
    {key: 'personFirstName', name: 'نام و نام خانوادگی'},
    {key: 'personNationalCode', name: 'کدملی'},
    {key: 'check', name: 'انتخاب'},
  ];
  newRelationColumnsToDisplay0: string[] = this.newRelationColumnsToDisplay.map(s => s.key);
  newRelationDataSource: MatTableDataSource<any> | null = null;

  constructor() {
    super();
    this.relationColumnsToDisplay = this.relationColumnsToDisplay.filter(s => s.key !== 'check');
    this.relationColumnsToDisplay0 = this.relationColumnsToDisplay.map(s => s.key);
    this.getRelations();
    this.getNewRelations();
  }

  getNewRelations() {
    this.restApiService.getNewPersonByParentId().subscribe((res: RelatedPersonsResponse) => {
      this.newRelationDataSource = new MatTableDataSource<any>(res.data);
    });
  }
}
