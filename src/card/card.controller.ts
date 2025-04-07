import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CardService } from './card.service';
import { CardResponseDTO } from './dtos/card-response.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @ApiOkResponse({
    type: [CardResponseDTO],
  })
  @Get('company/:companyId')
  async getCardsByCompanyId(
    @Param('companyId', ParseIntPipe) companyId: number,
  ) {
    return this.cardService.getCardsByCompanyId(companyId);
  }
}
