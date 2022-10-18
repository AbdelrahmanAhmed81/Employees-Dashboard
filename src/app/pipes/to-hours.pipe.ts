import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toHours'
})
export class ToHoursPipe implements PipeTransform {

  transform(value: number): number {
    return Math.trunc(value / 60);
  }

}
