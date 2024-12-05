import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { filter, switchMap, take } from 'rxjs';

import { DialogService, SnackBarService } from '@finance-app/shared/services';

import { OperationUpsertFetchService } from '../data-access/operation-upsert-fetch.service';
import { OperationUpsertCategoryPipe } from '../pipes/operation-upsert-category.pipe';
import { OperationUpsertFormService } from '../services/operation-upsert-form.service';

@Component({
    standalone: true,
    selector: 'app-operation-upsert',
    templateUrl: './operation-upsert.component.html',
    styles: [
        `
            :host {
                @apply block mx-auto;
            }
        `
    ],
    imports: [
        MatIconModule,
        MatSelect,
        MatOption,
        MatButtonToggleGroup,
        MatButtonToggle,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        JsonPipe,
        OperationUpsertCategoryPipe,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideNativeDateAdapter(), OperationUpsertFormService, OperationUpsertFetchService]
})
export class OperationUpsertComponent implements OnInit {
    private readonly _destroyRef = inject(DestroyRef);

    private readonly _snackBarService = inject(SnackBarService);

    private readonly _fetchService = inject(OperationUpsertFetchService);

    private readonly _router = inject(Router);

    private readonly _dialogService = inject(DialogService);

    protected readonly _formService = inject(OperationUpsertFormService);

    protected _actionButtonLabel = computed(() => {
        const label = this.id() ? 'Update' : 'Create';
        const amount = this._formService.amountValue() ?? '';
        return `${label} ${amount}`;
    });

    readonly id = input<string>();

    ngOnInit(): void {
        this._loadData();
    }

    protected _actionHandler(): void {
        if (this._formService.form.valid) {
            if (this.id()) {
                this._update();
            } else {
                this._create();
            }
        } else {
            this._formService.form.markAllAsTouched();
        }
    }

    protected _cancelHandler(): void {
        this._router.navigate(['..']);
    }

    protected _deleteHandler(): void {
        if (this.id()) {
            this._dialogService
                .confirm()
                .pipe(
                    filter((result) => {
                        console.log(result);

                        return !!result;
                    }),
                    switchMap(() => this._fetchService.delete(this.id() as string))
                )
                .subscribe({
                    next: () => {
                        console.log('next');
                        this._snackBarService.open('Operation Successfully deleted');
                        this._formService.clear();
                        this._cancelHandler();
                    },
                    error: () => {
                        this._snackBarService.open('Error deleting operation, try again');
                    }
                });
        }
    }

    private _loadData(): void {
        if (this.id()) {
            this._fetchService
                .getOne(this.id() as string)
                .pipe()
                .subscribe({
                    next: (data) => {
                        if (data) {
                            this._formService.pathValue({
                                name: data.name,
                                amount: data.amount,
                                category: data.category,
                                operationType: data.operationType,
                                date: data.date
                            });
                        } else {
                            this._snackBarService.open('This operation does not exist');
                            this._cancelHandler();
                        }
                    }
                });
        }
    }

    private _create(): void {
        this._fetchService
            .create(this._formService.value)
            .pipe(takeUntilDestroyed(this._destroyRef), take(1))
            .subscribe({
                next: () => {
                    this._snackBarService.open('New operation Successfully added');
                    this._cancelHandler();
                },
                error: () => {
                    this._snackBarService.open('Error adding new operation, try again');
                }
            });
    }

    private _update(): void {
        this._fetchService
            .update(this.id() as string, this._formService.value)
            .pipe(takeUntilDestroyed(this._destroyRef), take(1))
            .subscribe({
                next: () => {
                    this._snackBarService.open('Operation Successfully updated');
                    this._cancelHandler();
                },
                error: () => {
                    this._snackBarService.open('Error updating operation, try again');
                }
            });
    }
}
