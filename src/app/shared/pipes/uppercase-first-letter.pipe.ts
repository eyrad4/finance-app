import { Pipe, PipeTransform } from '@angular/core';

import { Nullish } from '@finance-app/shared/cdk/types';

@Pipe({
    standalone: true,
    name: 'uppercaseFirstLetter'
})
export class UppercaseFirstLetterPipe implements PipeTransform {
    transform(query: string | Nullish): string | Nullish {
        if (!query) {
            return query;
        }

        return query.charAt(0).toUpperCase() + query.slice(1);
    }
}
