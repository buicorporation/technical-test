import { Module } from '@nestjs/common';
import { TransactionService } from '../core/application/transactions.service';
import { TransactionsController } from '../interface/controllers/transactions.controller';
import { InMemoryTransactionRepository } from '../infrastructure/repositories/in-memory-transaction.repository';

@Module({
  providers: [
    TransactionService,
    { provide: 'TransactionRepository', useClass: InMemoryTransactionRepository }
  ],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
