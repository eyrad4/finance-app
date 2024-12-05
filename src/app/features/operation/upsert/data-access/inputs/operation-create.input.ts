import { TransactionModel } from '@finance-app/features/transaction/models';

export type OperationCreateInput = Omit<TransactionModel, 'id'>;
