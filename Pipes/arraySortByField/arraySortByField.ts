import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: "sortByField"
})
export class SortByFieldPipe implements PipeTransform {
  transform(array: any[], field: string): any[] {
    if (!field) return array;

    array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
