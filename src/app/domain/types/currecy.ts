import { UnionOf } from '@finance-app/shared/cdk/types';

export const CURRENCY = {
    usd: 'USD'
};

export type Currency = UnionOf<typeof CURRENCY>;
