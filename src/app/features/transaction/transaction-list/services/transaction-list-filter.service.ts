import { Injectable, signal } from '@angular/core';

import { IncomeCategory, OperationType } from '@finance-app/domain/types';
import { TransactionModel } from '@finance-app/features/transaction';
import { Nullish } from '@finance-app/shared/cdk/types';

export type FilterByCategory = IncomeCategory | OperationType | Nullish;

export type FilterByOperationType = OperationType | Nullish;

@Injectable()
export class TransactionListFilterService {
    private _operationType = signal<FilterByOperationType>(undefined);

    private _category = signal<FilterByCategory>(undefined);

    readonly operationType = this._operationType.asReadonly();

    readonly category = this._category.asReadonly();

    setOperationType(value: FilterByOperationType) {
        this._operationType.set(value);
    }

    setCategory(value: FilterByCategory) {
        this._category.set(value);
    }

    filteredItems(items: TransactionModel[]): TransactionModel[] {
        const category = this._category();
        const operationType = this._operationType();

        let internalItems = items;

        if (operationType) {
            internalItems = this._filteredByOperationType(internalItems);
        }

        if (category) {
            internalItems = this._filteredByCategory(internalItems);
        }

        return internalItems;
    }

    private _filteredByOperationType(items: TransactionModel[]): TransactionModel[] {
        return items.filter((item) => item.operationType === this._operationType());
    }

    private _filteredByCategory(items: TransactionModel[]): TransactionModel[] {
        return items.filter((item) => item.category === this._category());
    }
}
