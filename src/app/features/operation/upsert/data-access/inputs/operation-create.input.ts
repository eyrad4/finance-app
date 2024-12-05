import { TransactionModel } from '@finance-app/features/transaction';

export type OperationCreateInput = Omit<TransactionModel, 'id'>;
