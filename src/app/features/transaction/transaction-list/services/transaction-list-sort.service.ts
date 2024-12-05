import { Injectable, signal } from '@angular/core';
import { Sort } from '@angular/material/sort';

import { TransactionModel } from '@finance-app/features/transaction';
import { Nullish } from '@finance-app/shared/cdk/types';

@Injectable()
export class TransactionListSortService {
    private readonly _sort = signal<Sort | Nullish>(undefined);

    setSort(value: Sort | Nullish) {
        this._sort.set(value);
    }

    sortedItems(items: TransactionModel[]): TransactionModel[] {
        const sort = this._sort();
        if (!sort) {
            return items;
        }

        const sortDirection = sort?.direction || 'desc';
        const sortActive = sort?.active as keyof TransactionModel;

        return items.toSorted((a, b) => {
            const elemA = a?.[sortActive] ?? 0;
            const elemB = b?.[sortActive] ?? 0;
            const direction = sortDirection === 'asc' ? elemA > elemB : elemA < elemB;

            return direction ? 1 : -1;
        });
    }
}
