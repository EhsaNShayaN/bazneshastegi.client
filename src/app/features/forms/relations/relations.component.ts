import {Component, OnInit} from '@angular/core';
import {FormArray, Validators} from '@angular/forms';
import {BaseFormComponent} from '../base-form-component';
import {CustomConstants} from '../../../core/constants/custom.constants';
import {MatTableDataSource} from '@angular/material/table';
import {RelatedPersons, RelatedPersonsResponse} from '../../../core/models/RelatedPersonsResponse';

@Component({
  selector: 'app-relations',
  templateUrl: './relations.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class RelationsComponent extends BaseFormComponent implements OnInit {
  columnsToDisplay = [
    {key: 'personFirstName', name: 'نام'},
    {key: 'personLastName', name: 'نام خانوادگی'},
    {key: 'personFatherName', name: 'نام پدر'},
    {key: 'personNationalCode', name: 'کدملی'},
    {key: 'relation', name: 'نسبت'},
  ];
  columnsToDisplay0: string[] = this.columnsToDisplay.map(s => s.key);

  constructor() {
    super();
  }

  override createForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      relation: ['', Validators.required],
      grade: ['', Validators.required],
      loanAmount: [null, [Validators.required, Validators.min(1000)]],
      requestType: ['', Validators.required], // محصل یا دانشجو
      dependents: this.fb.array([]),
      attachments: this.fb.array(
        this.requestTypes.map(s =>
          this.fb.group({
            obj: [s],
            type: [s.lookupName],
            file: [null, s.mandantory ? Validators.required : null],
            uploaded: [false]
          })
        )
      ),
    });
  }

  ngOnInit() {
    this.restApiService.getRelatedPersons().subscribe((b: RelatedPersonsResponse) => {
      this.initDataSource(b);
    });
  }

  get dependents() {
    return this.form.get('dependents') as FormArray;
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
