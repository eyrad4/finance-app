import { TransactionModel } from '@finance-app/features/transaction/models';

export type OperationUpdateInput = Partial<Omit<TransactionModel, 'id' | 'operationType'>>;
