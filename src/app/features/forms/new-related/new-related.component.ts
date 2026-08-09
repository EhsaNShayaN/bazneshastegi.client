import {Component} from '@angular/core';
import {BaseFormComponent} from '../base-form-component';
import {MatTableDataSource} from '@angular/material/table';
import {TempPersonsResponse} from '../../../core/models/TempPersonsResponse';

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
    {key: 'personFirstName', name: 'نام'},
    {key: 'personLastName', name: 'نام خانوادگی'},
    {key: 'relationshipName', name: 'نسبت'},
    {key: 'educationTypeName', name: 'مقطع تحصیلی'},
    {key: 'pensionaryIsUnderGauranteeText', name: 'تحت تکفل'},
    {key: 'actions', name: 'نمایش اطلاعات'},
  ];
  newRelationcurrentColumnsToDisplay: string[] = this.newRelationColumnsToDisplay.map(s => s.key);
  newRelationDataSource: MatTableDataSource<any> | null = null;

  constructor() {
    super();
    this.relationColumnsToDisplay = this.relationColumnsToDisplay.filter(s => s.key !== 'check');
    this.relationcurrentColumnsToDisplay = this.relationColumnsToDisplay.map(s => s.key);
    this.getRelations();
    this.getNewRelations();
  }

  getNewRelations() {
    /*this.restApiService.getNewPersonByParentId().subscribe((res: RelatedPersonsResponse) => {
      this.newRelationDataSource = new MatTableDataSource<any>(res.data);
    });*/
    this.restApiService.getTempPerson().subscribe((res: TempPersonsResponse) => {
      this.newRelationDataSource = new MatTableDataSource<any>(res.data);
    });
  }
}
