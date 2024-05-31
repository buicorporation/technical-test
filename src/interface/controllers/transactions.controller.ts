import { Controller, Get , Post, Put , Delete , Body , Param } from '@nestjs/common';
import { TransactionService } from '../../core/application/transactions.service';
import { Transaction } from '../../core/domain/transaction.entity';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionService: TransactionService) {}

    @Post('create')
    async create(@Body() transactionData: any) {
        const transaction = new Transaction(
          transactionData.id,
          transactionData.amount,
          transactionData.type,
          new Date(transactionData.date),
        );
        await this.transactionService.createTransaction(transaction);
      }

    @Get()
    async findAll() {
        return this.transactionService.getTransactions();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.transactionService.getTransactionById(parseInt(id, 10));
    }

    //  ici permet de mettre à jour un transaction
    @Put(':id')
    async update(@Param('id') id: string, @Body() transactionData: any) {
        const transaction = new Transaction(
          parseInt(id, 10),
          transactionData.amount,
          transactionData.type,
          new Date(transactionData.date),
        );
        await this.transactionService.updateTransaction(transaction);
      }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.transactionService.deleteTransaction(parseInt(id, 10));
    }

}
