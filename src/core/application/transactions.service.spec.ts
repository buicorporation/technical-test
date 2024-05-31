// src/core/application/transaction.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transactions.service';
import { InMemoryTransactionRepository } from '../../infrastructure/repositories/in-memory-transaction.repository';
import { Transaction } from '../domain/transaction.entity';

describe('TransactionService', () => {
  let service: TransactionService;
  let repository: InMemoryTransactionRepository;

  beforeEach(async () => {
    repository = new InMemoryTransactionRepository();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        { provide: 'TransactionRepository', useValue: repository },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a transaction', async () => {
    const transaction = new Transaction(1, 100, 'credit', new Date());
    await service.createTransaction(transaction);
    expect(await repository.findById(1)).toEqual(transaction);
  });

  it('should return all transactions', async () => {
    const transaction1 = new Transaction(1, 100, 'credit', new Date());
    const transaction2 = new Transaction(2, 200, 'debit', new Date());
    await service.createTransaction(transaction1);
    await service.createTransaction(transaction2);
    expect(await service.getTransactions()).toEqual([transaction1, transaction2]);
  });

  it('should return a transaction by id', async () => {
    const transaction = new Transaction(1, 100, 'credit', new Date());
    await service.createTransaction(transaction);
    expect(await service.getTransactionById(1)).toEqual(transaction);
  });

  it('should update a transaction', async () => {
    const transaction = new Transaction(1, 100, 'credit', new Date());
    await service.createTransaction(transaction);
    const updatedTransaction = new Transaction(1, 150, 'debit', new Date());
    await service.updateTransaction(updatedTransaction);
    expect(await repository.findById(1)).toEqual(updatedTransaction);
  });

  it('should delete a transaction', async () => {
    const transaction = new Transaction(1, 100, 'credit', new Date());
    await service.createTransaction(transaction);
    await service.deleteTransaction(1);
    expect(await repository.findById(1)).toBeNull();
  });
});
