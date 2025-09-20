import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Helpers} from '../../../core/helpers';
import {MatTableDataSource} from '@angular/material/table';
import {InsertRequest, InsertRequestComplementary, PayFractionCertificate} from './pay-fraction-certificate.model';
import {LookUpData, LookUpDataResponse} from '../../../core/models/LookUpResponse';
import {MatSelectChange} from '@angular/material/select';
import {InsertResponse} from '../../../core/models/InsertResponse';
import {CustomConstants} from '../../../core/constants/custom.constants';
import {InsertComplementaryResponse} from '../../../core/models/InsertComplementaryResponse';
import {BaseFormComponent} from '../base-form-component';

@Component({
  selector: 'app-pay-fraction-certificate',
  templateUrl: './pay-fraction-certificate.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class PayFractionCertificateComponent extends BaseFormComponent implements OnInit {
  form: FormGroup;
  dataSource: MatTableDataSource<any> | null = null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;
  @ViewChild(MatSort, {static: true}) sort: MatSort | undefined;
  totalCount = 0;
  columnsToDisplay = [
    {key: 'firstName', name: 'نام'},
    {key: 'lastName', name: 'نام خانوادگی'},
    {key: 'relation', name: 'نسبت'},
    {key: 'lender', name: 'وام‌دهنده'},
    {key: 'branch', name: 'شعبه'},
    {key: 'remainingInstallmentsCount', name: 'تعداد اقساط باقی‌مانده'},
    {key: 'loanAmount', name: 'مبلغ وام'}
  ];
  columnsToDisplay0: string[] = this.columnsToDisplay.map(s => s.key);
  lenders: LookUpData[] = [];
  branches: LookUpData[] = [];

  constructor(private fb: FormBuilder,
              private helpers: Helpers) {
    super();
    this.form = this.fb.group({
      guarantorSalary: ['', Validators.required],
      amountRemain: ['', Validators.required],
      includeSalary: [false],
      includeHistory: [false],
      attachments: this.fb.array([
        this.fb.group({type: 'کپی شناسنامه', uploaded: [false]}),
        this.fb.group({type: 'کپی کارت ملی', uploaded: [false]})
      ]),

      // مشخصات وام گیرنده
      borrower: this.fb.group({
        nationalCode: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        firstName: [{value: '', disabled: true}, Validators.required],
        lastName: [{value: '', disabled: true}, Validators.required],
        birthDate: ['', Validators.required],
        relation: ['']
      }),

      // مشخصات وام دهنده
      lender: this.fb.group({
        name: ['', Validators.required],
        branchName: [''],
        branchCode: [''],
        loanAmount: ['', Validators.required],
        installmentCount: [''],
      }),

      documents: this.fb.group({
        idCopy: [false],
        nationalCardCopy: [false],
        other: ['']
      }),
    });
    this.sub2 = this.personInfoSubject.subscribe(data => {
      this.form.get('amountRemain')?.setValue(this.personInfo?.remainedAmountForCertificate);
    });
  }

  override ngOnInit(): void {
    this.helpers.setPaginationLang();
    this.restApiService.getLookupData('Bank', null).subscribe((a: LookUpDataResponse) => {
      this.lenders = a.data;
    });
  }

  onFileSelected(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      console.log('Selected file for', this.attachments.at(index).get('type')?.value, file);

      // mark as uploaded
      this.attachments.at(index).patchValue({uploaded: true});
    }
  }

  get attachments(): FormArray {
    return this.form.get('attachments') as FormArray;
  }

  get borrower() {
    return this.form.get('borrower') as FormGroup;
  }

  get lender() {
    return this.form.get('lender') as FormGroup;
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.getRawValue());
      const request: PayFractionCertificate = this.form.getRawValue();
      console.log('📌 فرم گواهی کسر از حقوق ثبت شد:');
      console.log(request);
      const insert: InsertRequest = {
        personID: this.personInfo!.personID,
        nationalCode: request.borrower.nationalCode,
        personFirstName: request.borrower.firstName,
        personLastName: request.borrower.lastName,
        requestDate: new Date(),
        requestTypeID: this.requestTypeID,
        requestText: 'گواهی کسر از حقوق از طرف بازنشسته',
        insertUserID: 'baz-1',
        requestFrom: 2,
      };
      this.restApiService.insert(insert).subscribe((c: InsertResponse) => {
        console.log(c.data);
        const insertComplementary: InsertRequestComplementary = {
          requestID: c.data.requestID,
          personID: this.personInfo!.personID,
          ceremonyDate: new Date(),
          insertPayAmountInCertificate: request.includeSalary,
          insertDurationInCertificate: request.includeHistory,
          applicantNationalCode: request.borrower.nationalCode,
          applicantBirthDate: request.borrower.birthDate,
          applicantFirstName: request.borrower.firstName,
          applicantLastName: request.borrower.lastName,
          applicantRelationship: request.borrower.relation,
          facilityAmount: request.lender.loanAmount,
          facilityInstalementCount: request.lender.installmentCount,
        };
        this.restApiService.insertComplementary(insertComplementary).subscribe((d: InsertComplementaryResponse) => {
          console.log(d);
          this.toaster.success(CustomConstants.THE_OPERATION_WAS_SUCCESSFUL, '', {});
          this.form.reset();
          this.form.markAsPristine();
          this.form.markAsUntouched();
        });
      });
    } else {
      this.form.markAllAsTouched();
      console.log(this.findInvalidControls(this.form));
      console.log(this.findInvalidControls(this.lender));
      console.log(this.findInvalidControls(this.borrower));
    }
  }

  lenderChanged($event: MatSelectChange<LookUpData>) {
    this.restApiService.getLookupData('BankBranch', $event.value.lookUpID).subscribe((a: LookUpDataResponse) => {
      this.branches = a.data;
    });
  }
}
