import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousand'
})
export class ThousandPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): any {
    if (value >= 1000) {
      return value / 1000 + 'K';
    } else {
      return value;
    }
  }

}
