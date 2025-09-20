import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PureComponent} from '../../pure-component';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  standalone: false
})
export class DatePickerComponent extends PureComponent implements OnInit {
  @Input() title: string = '';
  @Output() dateSelect = new EventEmitter<string>();
  date: any;

  constructor() {
    super();
  }

  ngOnInit(): void {

  }

  dateChanged(dateRangeStart: HTMLInputElement) {
    this.date = this.toEnglish(dateRangeStart.value);
    const startDate = this.toGeorgianDate();
    this.dateSelect.next(dateRangeStart.value);
  }

  toGeorgianDate() {
    let startDate: Date;
    const start = moment.from(this.date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
    const yearStart = Number(start.substring(0, 4));
    const monthStart = Number(start.substring(5, 7));
    const dayStart = Number(start.substring(8, 10));
    startDate = new Date(yearStart, monthStart - 1, dayStart);
    return startDate;
  }

  toEnglish(s: string) {
    let x = s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
    x = x.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString());
    return x;
  }
}
