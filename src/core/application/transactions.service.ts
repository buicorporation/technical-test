import { Injectable, Inject } from '@nestjs/common';
import { TransactionRepository } from '../domain/transaction.repository';
import { Transaction } from '../domain/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async createTransaction(transaction: Transaction): Promise<void> {
    await this.transactionRepository.save(transaction);
  }

  async getTransactions(): Promise<Transaction[]> {
    return this.transactionRepository.findAll();
  }

  async getTransactionById(id: number): Promise<Transaction | null> {
    return this.transactionRepository.findById(id);
  }

  async updateTransaction(transaction: Transaction): Promise<void> {
    await this.transactionRepository.save(transaction);
  }

  async deleteTransaction(id: number): Promise<void> {
    await this.transactionRepository.deleteById(id);
  }
}
