import { UnionOf } from '@finance-app/shared/cdk/types';

export const EXPENSES_CATEGORY = {
    groceries: 'groceries',
    entertainment: 'entertainment'
} as const;

export type ExpensesCategory = UnionOf<typeof EXPENSES_CATEGORY>;
