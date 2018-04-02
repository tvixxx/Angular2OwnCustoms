import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
  transform(value: Array<any>): Array<any> {
    return value.slice().reverse();
  }
}
