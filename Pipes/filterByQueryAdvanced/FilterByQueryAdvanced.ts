// I've used a little package.
// https://github.com/angus-c/just/tree/master/packages/object-safe-get

import { Pipe, PipeTransform } from '@angular/core';
import get from 'just-safe-get';

@Pipe({
    name: 'filterByQuery'
})
export class FilterByQueryPipe implements PipeTransform {

    transform(
        array: Array<any>,
        query: Array<string> | string,
        propChain: Array<string>,
        additionalProp: number = 2
    ): any {
        if (!query) return array;

        if (query && propChain.length < additionalProp) {
            return array.filter(function(item) {
                let chainValue = get(item, propChain[0]);

                if (!chainValue) return item;

                if (typeof query === 'string') {
                    return chainValue.toLowerCase()
                        .includes(query.toLowerCase());
                }
            });
        }

        return array.filter(function(item) {
            let existingChain = propChain.filter(function(chain) {
            let isValueExistInChain = Boolean(get(item, chain));

            if (!isValueExistInChain) return false;

                for (let i = 0; i < propChain.length; i++) {
                    let isValueEqual = get(item, chain)
                       .toLowerCase()
                       .includes(query[i].toLowerCase());

                    if (isValueEqual) {
                        return true;
                    }
                }
           });

           if (!existingChain) return false;

           return existingChain.length > 0;
        });
    }
}
