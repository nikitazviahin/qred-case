import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('user/:userId')
  async getCompaniesByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.companyService.getCompaniesByUserId(userId);
  }
}
