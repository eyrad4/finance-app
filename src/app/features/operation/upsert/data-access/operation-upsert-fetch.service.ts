import { inject, Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { LocalAsyncStorageService } from '@finance-app/core/storage';
import { TransactionModel } from '@finance-app/features/transaction/models';
import { UuidService } from '@finance-app/shared/cdk/services';
import { Nullish } from '@finance-app/shared/cdk/types';

import { OperationCreateInput } from './inputs/operation-create.input';
import { OperationUpdateInput } from './inputs/operation-update.input';

@Injectable()
export class OperationUpsertFetchService {
    private readonly _storageService = inject(LocalAsyncStorageService);

    private readonly _uuidService = inject(UuidService);

    getOne(id: string): Observable<TransactionModel | Nullish> {
        return this._storageService
            .getItem$<TransactionModel[]>('transactions')
            .pipe(map((transactions) => transactions?.find((transaction) => transaction.id === id) ?? null));
    }

    create(input: OperationCreateInput): Observable<TransactionModel> {
        const newTransaction: TransactionModel = { id: this._uuidService.uuid(), ...input };
        const getTransactions = this._storageService.getItem<TransactionModel[]>('transactions');
        const newTransactions: TransactionModel[] =
            getTransactions && Array.isArray(getTransactions) ? [...getTransactions, newTransaction] : [newTransaction];

        this._storageService.setItem<TransactionModel[]>('transactions', newTransactions);
        return of(newTransaction);
    }

    update(id: string, input: OperationUpdateInput): Observable<TransactionModel | Nullish> {
        const getTransactions = this._storageService.getItem<TransactionModel[]>('transactions');

        if (!getTransactions) {
            return of(null);
        }

        const findTransaction = getTransactions.find((transaction) => transaction.id === id);

        if (!findTransaction) {
            return of(null);
        }

        const newTransaction: TransactionModel = { ...findTransaction, ...input };
        const newTransactions: TransactionModel[] = getTransactions.map((transaction) =>
            transaction.id === id ? newTransaction : transaction
        );

        this._storageService.setItem<TransactionModel[]>('transactions', newTransactions);

        return of(newTransaction);
    }

    delete(id: string): Observable<Nullish> {
        const getTransactions = this._storageService.getItem<TransactionModel[]>('transactions');

        if (!getTransactions) {
            return EMPTY;
        }

        const newTransactions = getTransactions.filter((transaction) => transaction.id !== id);

        this._storageService.setItem<TransactionModel[]>('transactions', newTransactions);

        return of(undefined);
    }
}
