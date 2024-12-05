import { Pipe, PipeTransform } from '@angular/core';

import {
    EXPENSES_CATEGORY,
    ExpensesCategory,
    INCOME_CATEGORY,
    IncomeCategory,
    OPERATION_TYPE,
    OperationType
} from '@finance-app/domain/types';
import { Nullish } from '@finance-app/shared/cdk/types';

interface ValueTitleModel<T extends string> {
    value: T;
    title: string;
}

@Pipe({
    standalone: true,
    name: 'operationUpsertCategory'
})
export class OperationUpsertCategoryPipe implements PipeTransform {

    transform(operationType: OperationType | Nullish): ValueTitleModel<IncomeCategory>[] | ValueTitleModel<ExpensesCategory>[] {
        if (operationType === OPERATION_TYPE.income) {
            return Object.values(INCOME_CATEGORY).map((value) => ({ value, title: this._upperCaseFirstLetter(value) }));
        }

        if (operationType === OPERATION_TYPE.expense) {
            return Object.values(EXPENSES_CATEGORY).map((value) => ({ value, title: this._upperCaseFirstLetter(value) }));
        }

        return [];
    }

    private _upperCaseFirstLetter(value: string): string {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
}
