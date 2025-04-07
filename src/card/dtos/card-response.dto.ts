import { ApiProperty } from '@nestjs/swagger';
import { InvoiceDTO } from './invoice.dto';

export class CardResponseDTO {
  @ApiProperty({})
  id: number;

  @ApiProperty({})
  cardNumber: string;

  @ApiProperty({})
  currency: string;

  @ApiProperty({})
  expiryDate: Date;

  @ApiProperty({})
  spendLimit: number;

  @ApiProperty({})
  monthlySpend: number;

  @ApiProperty({
    type: [InvoiceDTO],
  })
  invoices: InvoiceDTO[];
}
