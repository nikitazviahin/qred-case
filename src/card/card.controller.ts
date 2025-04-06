import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CardService } from './card.service';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get('company/:companyId')
  async getCardsByCompanyId(
    @Param('companyId', ParseIntPipe) companyId: number,
  ) {
    return this.cardService.getCardsByCompanyId(companyId);
  }
}
