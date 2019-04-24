import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'arrayFilterByQuery'
})
export class ArrayFilterByQueryPipe implements PipeTransform {
    transform(array: any[], query: string, arrayField: string) {
        if (array.length !== 0 || query !== '') {
            return array.filter(item => {
                const itemLowerCase = item[arrayField].toLowerCase();
                const queryLowerCase = query.toLowerCase();
                return itemLowerCase.includes(queryLowerCase);
            });
        }

        return array;
    }
}
