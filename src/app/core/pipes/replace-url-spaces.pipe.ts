import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'replaceUrlSpaces',
  standalone: false,
})
export class ReplaceUrlSpacesPipe implements PipeTransform {
  transform(value: string | undefined) {
    return value?.replace(/ /g, '-');
  }
}
