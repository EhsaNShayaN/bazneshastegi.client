import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {InsertRequest, InsertRequestComplementary, PayFractionCertificate} from './pay-fraction-certificate.model';
import {LookUpDataResponse} from '../../../core/models/LookUpResponse';
import {BaseFormComponent} from '../base-form-component';
import {SelectItem} from '../../../shared/components/custom-select/custom-select.component';

@Component({
  selector: 'app-pay-fraction-certificate',
  templateUrl: './pay-fraction-certificate.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class PayFractionCertificateComponent extends BaseFormComponent implements OnInit {
  columnsToDisplay = [
    {key: 'mainpersonFirstName', name: 'نام'},
    {key: 'mainpersonLastName', name: 'نام خانوادگی'},
    {key: 'facilityReceiverFullName', name: 'وام گیرنده'},
    {key: 'facilityGiverDesc', name: 'وام‌دهنده'},
    {key: 'facilityAmount', name: 'مبلغ وام'}
  ];
  columnsToDisplay0: string[] = this.columnsToDisplay.map(s => s.key);
  lenders: SelectItem[] = [];
  branches: SelectItem[] = [];
  facilityGiverLookupId: string = '';
  branchLoading = false;

  constructor() {
    super();
  }

  override createForm(): void {
    this.form = this.fb.group({
      includeSalary: [false],
      includeHistory: [false],
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
        facilityGiverDesc: [''],
        loanAmount: new FormControl(null, {nonNullable: true, validators: Validators.required}),
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
    this.restApiService.getLookupData('Bank', '').subscribe((a: LookUpDataResponse) => {
      this.lenders = a.data.map(s => ({
        id: s.lookUpID,
        name: s.lookUpName,
      }));
      this.lenders.splice(0, 0, {id: '-1', name: 'سایر'});
    });
  }

  get borrower() {
    return this.form.get('borrower') as FormGroup;
  }

  get lender() {
    return this.form.get('lender') as FormGroup;
  }

  submit() {
    console.log(this.form.getRawValue());
    if (this.form.valid) {
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
      const insertComplementary: InsertRequestComplementary = {
        requestID: '',
        requestTypeID: this.requestTypeID,
        personID: this.personInfo!.personID,
        insertPayAmountInCertificate: request.includeSalary,
        insertDurationInCertificate: request.includeHistory,
        applicantNationalCode: request.borrower.nationalCode,
        applicantBirthDate: this.datePipe.transform(request.borrower.birthDate, 'yyyy-MM-dd') ?? '',
        applicantFirstName: request.borrower.firstName,
        applicantLastName: request.borrower.lastName,
        applicantRelationship: request.borrower.relation,
        facilityAmount: request.lender.loanAmount,
        facilityInstalementCount: request.lender.installmentCount,
        facilityGiverLookupID: this.facilityGiverLookupId,
        facilityGiverDesc: request.lender.facilityGiverDesc,
      };
      this.send(insert, insertComplementary);
    } else {
      this.form.markAllAsTouched();
      this.lender.markAllAsTouched();
      this.borrower.markAllAsTouched();
      console.log(this.findInvalidControls(this.form));
      console.log(this.findInvalidControls(this.lender));
      console.log(this.findInvalidControls(this.borrower));
    }
  }

  lenderChanged($event: any) {
    if ($event) {
      this.branchLoading = true;
      this.facilityGiverLookupId = $event;
      this.restApiService.getLookupData('BankBranch', this.facilityGiverLookupId).subscribe((a: LookUpDataResponse) => {
        this.branches = a.data.map(s => ({
          id: s.lookUpID,
          name: s.lookUpName,
        }));
        this.branchLoading = false;
      });
      this.setValidation();
    }
  }

  setValidation() {
    const facilityGiverDesc = this.lender.get('facilityGiverDesc');
    const branchName = this.lender.get('branchName');

    if (this.facilityGiverLookupId === '-1') {
      branchName?.clearValidators();
      facilityGiverDesc?.setValidators([Validators.required]);
    } else {
      facilityGiverDesc?.clearValidators();
      branchName?.setValidators([Validators.required]);
    }
    branchName?.updateValueAndValidity({emitEvent: false});
    facilityGiverDesc?.updateValueAndValidity({emitEvent: false});
  }

  branchChanged($event: any): void {
    if ($event) {
      this.facilityGiverLookupId = $event;
    }
  }

  dateChanged(dateInput: HTMLInputElement) {
    const date = this.borrower.get('birthDate')?.value;
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  onLoanAmountChange($event: number) {

  }

  onLoanAmountKeyPress($event: KeyboardEvent) {

  }

  onLoanAmountKeyUp($event: KeyboardEvent) {

  }
}
