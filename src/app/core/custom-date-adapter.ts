import {Inject, Optional} from '@angular/core';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import jMoment from 'moment-jalaali';


export const PERSIAN_DATE_FORMATS = {
  parse: {
    dateInput: 'jYYYY/jMM/jDD'
  },
  display: {
    dateInput: 'jYYYY/jMM/jDD',
    monthYearLabel: 'jYYYY jMMMM',
    dateA11yLabel: 'jYYYY/jMM/jDD',
    monthYearA11yLabel: 'jYYYY jMMMM'
  }
};

export class JalaliMomentDateAdapter extends DateAdapter<jMoment.Moment> {
  constructor(@Optional() @Inject(MAT_DATE_LOCALE) matDateLocale: string | undefined) {
    super();
    this.setLocale(matDateLocale || jMoment.locale('fa'));
    jMoment.loadPersian();
  }

  invalid() {
    return 'hi' as any;
  }

  toIso8601(date: any) {
    return 'hi';
  }

  /**
   * returns year in jalali calendar system.
   */
  getYear(date: jMoment.Moment): number {
    return this.clone(date).jYear();
  }

  /**
   * returns month in jalali calendar system.
   */
  getMonth(date: jMoment.Moment): number {
    return this.clone(date).jMonth();
  }

  /**
   * returns day in jalali calendar system.
   */
  getDate(date: jMoment.Moment): number {
    return this.clone(date).jDate();
  }

  /**
   * returns Day Of Week in jalali calendar system.
   */
  getDayOfWeek(date: jMoment.Moment): number {
    return this.clone(date).day();
  }

  /**
   * returns Month Names in jalali calendar system.
   * most of the time we use long format. short or narrow format for month names is a little odd.
   */
  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    jMoment.loadPersian({dialect: 'persian-modern', usePersianDigits: false});
    const localeData: any = jMoment().localeData();

    if (style === 'long' || style === 'short') {
      return localeData.jMonths();
    } else {
      return localeData.jMonthsShort();
    }
  }

  /**
   * borrowed from angular material code.
   */
  getDateNames(): string[] {
    return this.range(31, i => String(i + 1));
  }

  /**
   * returns Day Of Week names in jalali calendar system.
   */
  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    switch (style) {
      case 'long':
        return jMoment().localeData().weekdays().slice(0);
      case 'short':
        return jMoment().localeData().weekdaysShort().slice(0);
      case 'narrow':
        return jMoment().localeData().weekdaysMin().slice(0);
    }
  }

  /**
   * returns year in jalali calendar system.
   */
  getYearName(date: jMoment.Moment): string {
    return this.clone(date).jYear().toString();
  }

  /**
   * returns first day of week in jalali calendar system.
   * first day of week is saturday, شنبه
   */
  getFirstDayOfWeek(): number {
    return 6;
  }

  /**
   * returns Number of Days In Month in jalali calendar system.
   */
  getNumDaysInMonth(date: jMoment.Moment, fa?: any): number {
    if ((date as any)['_d']) {
      return jMoment.jDaysInMonth(this.getYear((date as any)['_d']), this.getMonth((date as any)['_d']));
    }
    return jMoment.jDaysInMonth(this.getYear(date), this.getMonth(date));
  }

  clone(date: jMoment.Moment): jMoment.Moment {
    // return date.clone().locale(this.locale);
    return jMoment(date);
  }

  createDate(year: number, month: number, date: number): jMoment.Moment {
    return jMoment(`${year}/${month + 1}/${date}`, 'jYYYY/jM/jD');
  }

  today(): jMoment.Moment {
    return jMoment();
  }

  parse(value: any, parseFormat: string | string[]): jMoment.Moment | null {
    if (value && typeof value === 'string') {
      return jMoment(value, parseFormat, this.locale);
    }
    return value ? jMoment(value).locale(this.locale) : null;
  }

  format(date: jMoment.Moment, displayFormat: any): string {
    return this.clone(date).format(displayFormat);
  }

  addCalendarYears(date: jMoment.Moment, years: number): jMoment.Moment {
    return this.clone(date).add(years, 'jYear');
  }

  addCalendarMonths(date: jMoment.Moment, months: number): jMoment.Moment {
    return this.clone(date).add(months, 'jMonth');
  }

  addCalendarDays(date: jMoment.Moment, days: number): jMoment.Moment {
    return this.clone(date).add(days, 'day');
  }

  getISODateString(date: jMoment.Moment): string {
    return this.clone(date).format('jYYYY-jMM-jDD');
  }

  isDateInstance(obj: any): boolean {
    return jMoment.isMoment(obj);
  }

  isValid(date: jMoment.Moment): boolean {
    return this.clone(date).isValid();
  }

  range<T>(length: number, valueFunction: (index: number) => T): T[] {
    const valuesArray = Array(length);
    for (let i = 0; i < length; i++) {
      valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
  }
}
