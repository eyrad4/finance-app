import { inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { defer } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { OPERATION_TYPE, OperationType } from '@finance-app/domain/types';
import { TransactionModel } from '@finance-app/features/transaction/models';
import { FormStructureOf, Nullish } from '@finance-app/shared/cdk/types';
import { CustomValidators } from '@finance-app/shared/cdk/validators';

type UpsertFormValue = Omit<TransactionModel, 'id'>;

type UpsertForm = FormGroup<FormStructureOf<UpsertFormValue>>;

@Injectable()
export class OperationUpsertFormService {
    private _form!: UpsertForm;

    private readonly _fb = inject(NonNullableFormBuilder);

    readonly amountValue!: Signal<string | Nullish>;

    readonly operationTypeValue!: Signal<OperationType | Nullish>;

    constructor() {
        this._initForm();
        this.amountValue = toSignal(
            defer(() =>
                this._form.valueChanges.pipe(
                    map((value) => value?.amount),
                    distinctUntilChanged(),
                    map((amount) => (amount ? `$${amount}` : undefined))
                )
            )
        );

        this.operationTypeValue = toSignal(
            defer(() =>
                this._form.valueChanges.pipe(
                    map((value) => value.operationType),
                    distinctUntilChanged()
                )
            )
        );
    }

    get form(): UpsertForm {
        return this._form;
    }

    get value(): UpsertFormValue {
        return this._form.getRawValue();
    }

    get amountControl(): AbstractControl<UpsertFormValue['amount']> {
        return this._form.get('amount') as AbstractControl<UpsertFormValue['amount']>;
    }

    pathValue(value: UpsertFormValue): void {
        this._form.patchValue(value);
        console.log(value);
    }

    clear(): void {
        this._form.get('category')?.reset();
        this._form.get('amount')?.reset();
        this._form.get('name')?.reset();
    }

    private _initForm(): void {
        this._form = this._fb.group({
            name: this._fb.control<string>('', [Validators.required]),
            amount: this._fb.control<number | string>('', [
                Validators.required,
                CustomValidators.positiveNumber,
                CustomValidators.minMaxValidation(1)
            ]),
            category: this._fb.control<TransactionModel['category']>(null),
            operationType: this._fb.control<TransactionModel['operationType']>(OPERATION_TYPE.expense, [Validators.required]),
            date: this._fb.control<Date>(new Date(), [Validators.required])
        });
    }
}
