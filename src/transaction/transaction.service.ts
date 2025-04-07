import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PaginatedTransactionResponseDTO } from './dtos/paginated-transaction-response.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async getTransactionsByCardId(
    cardId: number,
    page = 1,
    limit = 10,
  ): Promise<PaginatedTransactionResponseDTO> {
    const skip = (page - 1) * limit;

    try {
      const transactions = await this.prisma.transaction.findMany({
        where: { cardId },
        skip,
        take: limit,
        orderBy: { transactionDate: 'desc' },
      });

      const total = await this.prisma.transaction.count({ where: { cardId } });

      return {
        data: transactions.map((t) => ({
          ...t,
          amount: t.amount.toNumber(),
        })),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      console.error(`Failed to fetch transactions for card ${cardId}`, error);
      throw error;
    }
  }
}
