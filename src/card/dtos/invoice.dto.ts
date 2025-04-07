import { ApiProperty } from '@nestjs/swagger';

export class InvoiceDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  cardId: number;

  @ApiProperty()
  dueDate: Date;

  @ApiProperty()
  amountDue: number;
}
