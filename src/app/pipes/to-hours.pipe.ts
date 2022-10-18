import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hours'
})
export class ToHoursPipe implements PipeTransform {

  transform(value: number): number {
    return Math.trunc(value / 60);
  }

}
