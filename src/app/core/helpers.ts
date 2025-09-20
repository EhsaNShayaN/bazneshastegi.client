import {MatPaginatorIntl} from '@angular/material/paginator';
import {Injectable} from '@angular/core';

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
}
