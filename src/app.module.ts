import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './company/company.module';
import { CardModule } from './card/card.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CompanyModule,
    CardModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
