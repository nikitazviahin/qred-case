import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('card/:cardId')
  async getTransactionsByCardId(
    @Param('cardId', ParseIntPipe) cardId: number,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ) {
    return this.transactionService.getTransactionsByCardId(cardId, page, limit);
  }
}
