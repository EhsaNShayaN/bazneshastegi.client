import 'moment';

declare module 'moment' {
  interface Locale {
    jMonths(): string[];

    jMonthsShort(): string[];
  }
}
