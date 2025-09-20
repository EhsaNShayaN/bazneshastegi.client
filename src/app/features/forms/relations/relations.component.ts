import {Component, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseFormComponent} from '../base-form-component';
import {CustomConstants} from '../../../core/constants/custom.constants';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {RelatedPersons, RelatedPersonsResponse} from '../../../core/models/RelatedPersonsResponse';

@Component({
  selector: 'app-relations',
  templateUrl: './relations.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class RelationsComponent extends BaseFormComponent {
  form: FormGroup;
  dataSource: MatTableDataSource<RelatedPersons> | null = null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null = null;
  @ViewChild(MatSort, {static: true}) sort: MatSort | null = null;
  totalCount = 0;
  columnsToDisplay = [
    {key: 'personFirstName', name: 'نام'},
    {key: 'personLastName', name: 'نام خانوادگی'},
    {key: 'personFatherName', name: 'نام پدر'},
    {key: 'personNationalCode', name: 'کدملی'},
    {key: 'relation', name: 'نسبت'},
  ];
  columnsToDisplay0: string[] = this.columnsToDisplay.map(s => s.key);

  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      relation: ['', Validators.required],
      grade: ['', Validators.required],
      loanAmount: [null, [Validators.required, Validators.min(1000)]],
      requestType: ['', Validators.required], // محصل یا دانشجو
      dependents: this.fb.array([]),
      attachments: this.fb.array([
        this.fb.group({type: 'کپی شناسنامه', uploaded: [false]}),
        this.fb.group({type: 'کپی کارت ملی', uploaded: [false]})
      ])
    });
    this.sub2 = this.personInfoSubject.subscribe(data => {
    });
  }

  override ngOnInit() {
    super.ngOnInit();

    this.restApiService.getRelatedPersons('R78').subscribe((b: RelatedPersonsResponse) => {
      this.initDataSource(b);
    });
  }

  get dependents() {
    return this.form.get('dependents') as FormArray;
  }

  public initDataSource(res: any) {
    this.totalCount = res.totalCount;
    this.dataSource = new MatTableDataSource<RelatedPersons>(res.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addDependent() {
    this.dependents.push(
      this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        relation: ['', Validators.required],
        grade: ['', Validators.required],
        loanAmount: [null],
        dateReceived: ['']
      })
    );
  }

  submit() {
    if (this.form.valid) {
      console.log('📌 اطلاعات وابسته ثبت شد:', this.form.value);
      this.toaster.success(CustomConstants.THE_OPERATION_WAS_SUCCESSFUL, '', {});
      this.form.reset();
      this.form.markAsPristine();
      this.form.markAsUntouched();
    } else {
      this.form.markAllAsTouched();
      console.log(this.findInvalidControls(this.form));
    }
  }
}
