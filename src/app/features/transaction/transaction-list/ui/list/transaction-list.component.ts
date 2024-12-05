import { ChangeDetectionStrategy, Component, computed, inject, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

import { Nullish } from '@finance-app/shared/cdk/types';

import { TransactionModel } from '../../../models/transaction.model';
import { OperationUpsertFetchService } from '../../data-access/transaction-list-fetch.service';
import { TransactionListFilterService } from '../../services/transaction-list-filter.service';
import { TransactionListSortService } from '../../services/transaction-list-sort.service';
import { TransactionListFiltersComponent } from '../filters/transaction-list-filters.component';

@Component({
    standalone: true,
    selector: 'app-transaction-list',
    templateUrl: './transaction-list.component.html',
    imports: [MatTableModule, MatSortModule, TransactionListFiltersComponent, RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [OperationUpsertFetchService, TransactionListFilterService, TransactionListSortService]
})
export class TransactionListComponent {
    private readonly _operationUpsertFetchService = inject(OperationUpsertFetchService);

    private readonly _filterService = inject(TransactionListFilterService);

    private readonly _sortService = inject(TransactionListSortService);

    protected readonly _displayedColumns = ['name', 'amount', 'category', 'operationType', 'date'];

    private readonly _sort = signal<Sort | Nullish>(undefined);

    protected _items: Signal<TransactionModel[]> = toSignal(this._operationUpsertFetchService.getAll()) as Signal<TransactionModel[]>;

    protected _filteredItems = computed(() => {
        let items = this._items();
        items = this._sortService.sortedItems(items);
        items = this._filterService.filteredItems(items);

        return items;
    });

    protected _sortWasChanged(sortData: Sort): void {
        this._sort.set(sortData);
    }
}
