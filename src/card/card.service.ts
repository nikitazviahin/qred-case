import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { TransactionService } from 'src/transaction/transaction.service';

@Injectable()
export class CardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly transactionService: TransactionService,
  ) {}

  async getCardsByCompanyId(companyId: number) {
    try {
      const cards = await this.prisma.card.findMany({
        where: {
          companyId: companyId,
        },
        include: {
          invoices: true,
        },
      });

      return Promise.all(
        cards.map(async (card) => {
          return {
            ...card,
            monthlySpent: await this.transactionService.getMonthlySpentByCard(
              card.id,
            ),
          };
        }),
      );
    } catch (error) {
      console.error(`Failed to fetch cards for company ${companyId}`, error);
      throw error;
    }
  }
}
