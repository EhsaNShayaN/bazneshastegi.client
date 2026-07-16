import {MatPaginatorIntl} from '@angular/material/paginator';
import {Injectable} from '@angular/core';
import * as moment from 'moment-timezone';
import * as jalaali from 'jalaali-js';

@Injectable({
  providedIn: 'root'
})
export class Helpers {
  constructor(private paginatorIntl: MatPaginatorIntl) {
  }

  public setPaginationLang() {
    this.paginatorIntl.itemsPerPageLabel = 'مورد در هر صفحه';
    this.paginatorIntl.firstPageLabel = 'صفحه اول';
    this.paginatorIntl.previousPageLabel = 'صفحه قبل';
    this.paginatorIntl.nextPageLabel = 'صفحه بعد';
    this.paginatorIntl.lastPageLabel = 'صفحه آخر';
    this.paginatorIntl.getRangeLabel = this.getRangeLabel;
  }

  getRangeLabel = (page: number, pageSize: number, length: number): string => {
    const of = 'از';
    if (length === 0 || pageSize === 0) {
      return '0 ' + of + ' ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize > length ? (Math.ceil(length / pageSize) - 1) * pageSize : page * pageSize;

    const endIndex = Math.min(startIndex + pageSize, length);
    return startIndex + 1 + ' تا ' + endIndex + ' ' + of + ' ' + length + ' مورد';
  };

  convertToShamsi(dateString: string, timeZone: string, showTime: boolean = true): string {
    try {
      const date = moment.tz(dateString, timeZone);
      if (!date.isValid()) {
        throw new Error('Invalid date');
      }

      // تبدیل تاریخ به شمسی
      const jsDate = date.toDate();
      const jDate = jalaali.toJalaali(jsDate);

      let year = jDate.jy.toString();
      let month = jDate.jm.toString();
      let day = jDate.jd.toString();

      // استخراج زمان (ساعت، دقیقه و ثانیه)
      let hours = parseInt(this.pad(jsDate.getHours()), 10).toString();
      let minutes = parseInt(this.pad(jsDate.getMinutes()), 10).toString();
      let seconds = parseInt(this.pad(jsDate.getSeconds()), 10).toString();

      // تبدیل تاریخ و زمان به اعداد فارسی
      const persianDate = `${year}/${month}/${day}`;
      const persianTime = `${hours}:${minutes}:${seconds}`;

      return showTime ? `${persianDate} - ${persianTime}` : persianDate;
    } catch (error) {
      console.error('Error converting date to Shamsi:', error);
      return 'Invalid date';
    }
  }

  pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
