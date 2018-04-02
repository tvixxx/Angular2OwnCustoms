import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: "filterByQueryPipe"
})
export class FilterByQueryPipe implements PipeTransform {
  transform(array: any[], field: string, queries: string[]) {
    if (queries && queries.length === 0) return array;

    let filteredQueries = [];
    let arrayLength = array.length;
    let queriesLength = queries.length;

    for (let i = 0; i < arrayLength; i++) {
      let itemValue = array[i][field];

      for (let j = 0; j < queriesLength; j++) {
        let isQueryInclude = itemValue.toLowerCase()
          .includes(queries[j].toLowerCase());
        
        if (isQueryInclude) {
          filteredQueries.push(array[i]);
        }
      }
    }

    return filteredQueries;
  }
}
