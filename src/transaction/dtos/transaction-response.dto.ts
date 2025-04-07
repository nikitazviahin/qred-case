import { ApiProperty } from '@nestjs/swagger';

export class TransactionResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  cardId: number;

  @ApiProperty()
  transactionDate: Date;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  currency: string;
}
