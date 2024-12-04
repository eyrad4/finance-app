import { UnionOf } from '@finance-app/shared/cdk/types';

export const INCOME_CATEGORY = {
    salary: 'Salary',
    bonus: 'Bonus'
} as const;

export type IncomeCategory = UnionOf<typeof INCOME_CATEGORY>;
