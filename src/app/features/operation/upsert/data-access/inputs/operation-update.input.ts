import { TransactionModel } from '@finance-app/features/transaction';

export type OperationUpdateInput = Partial<Omit<TransactionModel, 'id' | 'operationType'>>;
