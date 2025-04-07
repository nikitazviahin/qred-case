import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyResponseDto } from './dtos/company-response.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Companies')
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiOkResponse({
    type: [CompanyResponseDto],
  })
  @Get('user/:userId')
  async getCompaniesByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<CompanyResponseDto[]> {
    return this.companyService.getCompaniesByUserId(userId);
  }
}
