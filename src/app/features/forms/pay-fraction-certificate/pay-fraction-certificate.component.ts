import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormGroup, Validators} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {InsertRequest, InsertRequestComplementary, PayFractionCertificate} from './pay-fraction-certificate.model';
import {LookUpData, LookUpDataResponse} from '../../../core/models/LookUpResponse';
import {MatSelectChange} from '@angular/material/select';
import {InsertResponse} from '../../../core/models/InsertResponse';
import {CustomConstants} from '../../../core/constants/custom.constants';
import {BaseFormComponent} from '../base-form-component';
import {InsertComplementaryResponse} from '../../../core/models/InsertComplementaryResponse';

@Component({
  selector: 'app-pay-fraction-certificate',
  templateUrl: './pay-fraction-certificate.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class PayFractionCertificateComponent extends BaseFormComponent implements OnInit {
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

  constructor() {
    super();
  }

  override createForm(): void {
    this.form = this.fb.group({
      guarantorSalary: [{value: this.personInfo!.payAmount, disabled: true}, Validators.required],
      amountRemain: [{value: this.personInfo!.remainedAmountForCertificate, disabled: true}, Validators.required],
      includeSalary: [false],
      includeHistory: [false],
      attachments: this.fb.array(this.requestTypes.map(s => this.fb.group({obj: s, type: s.lookupName, uploaded: [false]}))),

      // مشخصات وام گیرنده
      borrower: this.fb.group({
        nationalCode: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        firstName: [{value: '', disabled: false}, Validators.required],
        lastName: [{value: '', disabled: false}, Validators.required],
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
  }

  ngOnInit(): void {
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
      this.restApiService.insert(insert).subscribe((a: InsertResponse) => {
        if (a.isSuccess) {
          console.log(a);
          const insertComplementary: InsertRequestComplementary = {
            requestID: a.data.requestID,
            personID: this.personInfo!.personID,
            ceremonyDate: new Date(),
            insertPayAmountInCertificate: request.includeSalary,
            insertDurationInCertificate: request.includeHistory,
            applicantNationalCode: request.borrower.nationalCode,
            applicantBirthDate: this.toGeorgianDate(request.borrower.birthDate),
            applicantFirstName: request.borrower.firstName,
            applicantLastName: request.borrower.lastName,
            applicantRelationship: request.borrower.relation,
            facilityAmount: request.lender.loanAmount,
            facilityInstalementCount: request.lender.installmentCount,
          };
          this.restApiService.insertComplementary(insertComplementary).subscribe((b: InsertComplementaryResponse) => {
            console.log(b);

            /*const insertRequestAttachment: InsertRequestAttachment = {
              requestID: a.data.requestID,
              attachementTypeID: this.attachementTypeID,
              attachementTypeName: this.attachementTypeName,
              insertUserID: this.insertUserID,
              insertTime: this.insertTime,
              updateUserID: this.updateUserID,
              updateTime: this.updateTime,
            };*/
            if (b.isSuccess) {
              this.toaster.success(CustomConstants.THE_OPERATION_WAS_SUCCESSFUL, '', {});
              this.form.reset();
              this.form.markAsPristine();
              this.form.markAsUntouched();
            } else {
              this.toaster.error(a.errors[0]?.errorMessage ?? 'خطای نامشخص', 'خطا', {});
            }
          });
        } else {
          this.toaster.error(a.errors[0]?.errorMessage ?? 'خطای نامشخص', 'خطا', {});
        }
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
