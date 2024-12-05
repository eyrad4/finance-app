import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LocalAsyncStorageService } from '@finance-app/core/storage';
import { OPERATION_TYPE, OperationType } from '@finance-app/domain/types';
import { TransactionModel } from '@finance-app/features/transaction';

@Injectable()
export class BalanceService {
    private readonly _storageService = inject(LocalAsyncStorageService);

    currentBalance(): Observable<number> {
        return this._storageService.getItem$<TransactionModel[]>('transactions').pipe(
            map((transactions) => {
                const incomeAmount = this._calcAmount(transactions, OPERATION_TYPE.income);
                const expenseAmount = this._calcAmount(transactions, OPERATION_TYPE.expense);
                return incomeAmount - expenseAmount;
            })
        );
    }

    private _calcAmount(items: TransactionModel[], operationType: OperationType): number {
        if (!items || !Array.isArray(items)) {
            return 0;
        }

        return items
            .filter((transaction) => transaction.operationType === operationType)
            .reduce((acc, transaction) => {
                const amount = transaction?.amount ? Number(transaction?.amount) : 0;
                return acc + amount;
            }, 0);
    }
}
