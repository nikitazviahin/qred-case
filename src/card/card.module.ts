import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TransactionModule } from 'src/transaction/transaction.module';
import { TransactionService } from 'src/transaction/transaction.service';

@Module({
  imports: [PrismaModule],
  controllers: [CardController],
  providers: [CardService, TransactionService],
})
export class CardModule {}
