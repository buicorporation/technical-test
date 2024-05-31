import { Transaction } from './transaction.entity';

export interface TransactionRepository {
  save(transaction: Transaction): Promise<void>;
  findById(id: number): Promise<Transaction | null>;
  findAll(): Promise<Transaction[]>;
  deleteById(id: number): Promise<void>;
}
