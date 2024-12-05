import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { LocalAsyncStorageService } from '@finance-app/core/storage';

@Injectable()
export class BalanceService {
    private readonly _localAsyncStorageService = inject(LocalAsyncStorageService);

    currentBalance(): Observable<number> {
        return of(120420);
    }
}
