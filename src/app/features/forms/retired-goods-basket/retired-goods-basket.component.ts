import {Component} from '@angular/core';
import {Validators} from '@angular/forms';
import {BaseFormComponent} from '../base-form-component';
import {InsertRequest} from '../pay-fraction-certificate/pay-fraction-certificate.model';
import {RetiredGoodsBasketRequest} from './retired-goods-basket.model';
import {LookUpDataResponse} from '../../../core/models/LookUpResponse';
import {SelectItem} from '../../../shared/components/custom-select/custom-select.component';
import {PersonInfoResponse} from '../../../core/models/PersonInfoResponse';

@Component({
  selector: 'app-retired-goods-basket',
  templateUrl: './retired-goods-basket.component.html',
  styleUrl: '../forms.scss',
  standalone: false
})
export class RetiredGoodsBasketComponent extends BaseFormComponent {
  basketReceiveTypes: SelectItem[] = [];
  currentBasketReceiveType?: SelectItem;
  unCurrentBasketReceiveType?: SelectItem;

  constructor() {
    super();
  }

  override createForm() {
    this.restApiService.getLookupData('BasketRecieveType', '').subscribe((a: LookUpDataResponse) => {
      this.basketReceiveTypes = a.data.map(s => ({
        id: s.lookUpID,
        name: s.lookUpName,
      }));
      this.form = this.fb.group({
        basketReceiveTypeID: [false, Validators.required],
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
      this.fillCurrents();
    });
  }

  submit() {
    console.log(this.form.getRawValue());
    if (this.form.valid) {
      if (!this.relatedPersonID) {
        this.relatedPersonIDError = true;
        return;
      }
      const request: RetiredGoodsBasketRequest = this.form.getRawValue();
      console.log('📌 فرم تغییر نوع سبد کالا بازنشسته ثبت شد:', request);
      const insert: InsertRequest = {
        personID: this.personInfo!.personID,
        nationalCode: this.personInfo!.personNationalCode,
        personFirstName: this.personInfo!.personFirstName,
        personLastName: this.personInfo!.personLastName,
        requestDate: new Date(),
        requestTypeID: this.requestTypeID,
        requestText: 'از کار افتادگی از طرف بازنشسته',
        insertUserID: 'baz-1',
        requestFrom: 2,
      };
      this.insert(insert).then(insertResponse => {
        if (insertResponse) {
          const model: RetiredGoodsBasketRequest = {
            requestID: insertResponse.data.requestID,
            requestTypeID: this.requestTypeID,
            loginedPersonID: this.personInfo?.personID ?? '',
            basketReceiveTypeID: request.basketReceiveTypeID,
          };
          this.call<RetiredGoodsBasketRequest>(
            insertResponse.data,
            this.restApiService.insertRequestForEditBasketReceiveTypeRetired(model));
        }
      });
    } else {
      this.form.markAllAsTouched();
      console.log(this.findInvalidControls(this.form));
    }
  }

  fillCurrents() {
    this.currentBasketReceiveType = this.basketReceiveTypes.find(s => s.id === this.personInfo?.basketReceiveTypeID);
    this.unCurrentBasketReceiveType = this.basketReceiveTypes.find(s => s.id !== this.personInfo?.basketReceiveTypeID);
  }

  override customFunction() {
    this.restApiService.getPersonInfo().subscribe((b: PersonInfoResponse) => {
      this.personInfo = b.data;
      this.fillCurrents();
    });
  }
}
