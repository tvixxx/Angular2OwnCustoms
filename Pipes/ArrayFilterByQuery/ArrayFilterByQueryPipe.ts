import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'arrayFilterByQuery'
})
export class ArrayFilterByQueryPipe implements PipeTransform {
    transform(array: any[], query: string, arrayField: string) {
        if (array.length !== 0 || query !== '') {
            let lowerCaseQuery = query.toLowerCase();
            return array.filter(item => item[arrayField].toLowerCase().includes(lowerCaseQuery));
        } 

        return array;        
    }
}
