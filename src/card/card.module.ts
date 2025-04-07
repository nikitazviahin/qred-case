import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { CardService } from './card.service';
import { CardController } from './card.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
