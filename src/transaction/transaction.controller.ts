import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { PaginatedTransactionResponseDTO } from './dtos/paginated-transaction-response.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiOkResponse({
    type: [PaginatedTransactionResponseDTO],
  })
  @Get('card/:cardId')
  async getTransactionsByCardId(
    @Param('cardId', ParseIntPipe) cardId: number,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ): Promise<PaginatedTransactionResponseDTO> {
    return this.transactionService.getTransactionsByCardId(cardId, page, limit);
  }
}
