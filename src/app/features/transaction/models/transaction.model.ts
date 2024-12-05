import { ExpensesCategory, IncomeCategory, OperationType } from '@finance-app/domain/types';
import { Nullish } from '@finance-app/shared/cdk/types';

export interface TransactionModel {
    id: string;
    name: string;
    amount: number | string;
    category: ExpensesCategory | IncomeCategory | Nullish;
    operationType: OperationType;
    date: Date;
}
