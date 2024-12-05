import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { EXPENSES_CATEGORY, INCOME_CATEGORY, IncomeCategory, OPERATION_TYPE, OperationType } from '@finance-app/domain/types';
import { Nullish } from '@finance-app/shared/cdk/types';
import { UppercaseFirstLetterPipe } from '@finance-app/shared/pipes';

import { TransactionListFilterService } from '../../services/transaction-list-filter.service';

type Category = IncomeCategory | OperationType | Nullish;

const CATEGORIES = [
    ...Object.values(EXPENSES_CATEGORY).map((category) => ({
        value: category,
        operationType: OPERATION_TYPE.expense
    })),
    ...Object.values(INCOME_CATEGORY).map((category) => ({
        value: category,
        operationType: OPERATION_TYPE.income
    }))
];

@Component({
    standalone: true,
    selector: 'app-transaction-list-filters',
    templateUrl: './transaction-list-filters.component.html',
    imports: [MatFormFieldModule, MatSelectModule, MatOptionModule, UppercaseFirstLetterPipe, FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionListFiltersComponent {
    private readonly _filterService = inject(TransactionListFilterService);

    private _categories = signal(CATEGORIES);

    // private _operationType = signal<OperationType | Nullish>(undefined);

    protected _selectedOperationType: OperationType | Nullish;

    protected _selectedCategory: Category;

    protected _operationTypes = Object.values(OPERATION_TYPE);

    protected _filteredCategories = computed(() => {
        const allCategories = this._categories();
        const operationType = this._filterService.operationType();

        if (operationType) {
            return allCategories.filter((category) => category.operationType === operationType);
        }

        return allCategories;
    });

    protected _operationTypeWasChanged(value: OperationType) {
        this._filterService.setOperationType(value);
        this._filterService.setCategory(undefined);
        this._selectedCategory = null;
    }

    protected _categoryWasChanged(value: Category) {
        this._filterService.setCategory(value);
    }
}
