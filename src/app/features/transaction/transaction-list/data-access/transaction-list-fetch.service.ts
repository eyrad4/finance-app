import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LocalAsyncStorageService } from '@finance-app/core/storage';
import { TransactionModel } from '@finance-app/features/transaction';

@Injectable()
export class OperationUpsertFetchService {
    private readonly _storageService = inject(LocalAsyncStorageService);

    getAll(): Observable<TransactionModel[]> {
        return this._storageService.getItem$<TransactionModel[]>('transactions');
    }
}
