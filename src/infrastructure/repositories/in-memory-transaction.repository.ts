import { TransactionRepository } from '../../core/domain/transaction.repository';
import { Transaction } from '../../core/domain/transaction.entity';

export class InMemoryTransactionRepository implements TransactionRepository {

    private transactions: Transaction[] = [];

    async save(transaction: Transaction): Promise<void> {
        const index = this.transactions.findIndex(t => t.id === transaction.id);
        if (index === -1) {
          this.transactions.push(transaction);
        } else {
          this.transactions[index] = transaction;
        }
      }
    // ici permet de trouver un transaction par son id
    async findById(id: number): Promise<Transaction | null> {
        return this.transactions.find(t => t.id === id) || null;
      }
      // ici permet de trouver tous les transactions
      async findAll(): Promise<Transaction[]> {
        return this.transactions;
      }
    
      async deleteById(id: number): Promise<void> {
        this.transactions = this.transactions.filter(t => t.id !== id);
      }
    
    
}