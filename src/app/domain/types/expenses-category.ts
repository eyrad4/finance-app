import { UnionOf } from '@finance-app/shared/cdk/types';

export const EXPENSES_CATEGORY = {
    groceries: 'Groceries',
    entertainment: 'Entertainment'
} as const;

export type IncomeCategory = UnionOf<typeof EXPENSES_CATEGORY>;
