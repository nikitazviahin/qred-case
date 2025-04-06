import { Injectable } from '@nestjs/common';
import { startOfMonth, endOfMonth } from 'date-fns';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async getTransactionsByCardId(cardId: number, page = 1, limit = 10) {
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
        data: transactions,
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

  async getMonthlySpentByCard(cardId: number) {
    try {
      const now = new Date();
      const monthStart = startOfMonth(now);
      const monthEnd = endOfMonth(now);

      const result = await this.prisma.transaction.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          cardId: cardId,
          transactionDate: {
            gte: monthStart,
            lte: monthEnd,
          },
        },
      });

      return result._sum.amount ?? 0;
    } catch (error) {
      console.error(
        `Error calculating monthly spend for card ${cardId}:`,
        error,
      );
    }
  }
}
