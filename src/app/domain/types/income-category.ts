import { UnionOf } from '@finance-app/shared/cdk/types';

export const INCOME_CATEGORY = {
    salary: 'salary',
    bonus: 'bonus'
} as const;

export type IncomeCategory = UnionOf<typeof INCOME_CATEGORY>;
