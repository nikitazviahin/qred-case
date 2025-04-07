import { Injectable } from '@nestjs/common';
import { startOfMonth, endOfMonth } from 'date-fns';
import { PrismaService } from 'prisma/prisma.service';
import { CardResponseDTO } from './dtos/card-response.dto';

@Injectable()
export class CardService {
  constructor(private readonly prisma: PrismaService) {}

  async getCardsByCompanyId(
    companyId: number,
  ): Promise<CardResponseDTO[] | undefined> {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    try {
      const cards = await this.prisma.card.findMany({
        where: {
          companyId: companyId,
        },
        include: {
          transactions: {
            where: {
              transactionDate: {
                gte: monthStart,
                lte: monthEnd,
              },
            },
            select: {
              amount: true,
            },
          },
          invoices: true,
        },
      });

      const cardsWithMonthlySpend = cards.map((card) => {
        const monthlySpend = card.transactions.reduce((sum, tx) => {
          return sum + Number(tx.amount);
        }, 0);

        return {
          id: card.id,
          cardNumber: card.cardNumber,
          currency: card.currency,
          expiryDate: card.expiryDate,
          spendLimit: card.spendLimit.toNumber(),
          invoices: card.invoices.map((i) => ({
            ...i,
            amountDue: i.amountDue.toNumber(),
          })),
          monthlySpend,
        };
      });

      return cardsWithMonthlySpend;
    } catch (error) {
      console.error('Error fetching cards with monthly spend:', error);
    }
  }
}
