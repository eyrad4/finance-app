import { UnionOf } from '@finance-app/shared/cdk/types';

export const OPERATION_TYPE = {
    income: 'income',
    expense: 'expense'
} as const;

export type OperationType = UnionOf<typeof OPERATION_TYPE>;
