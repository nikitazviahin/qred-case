import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CompanyResponseDto } from './dtos/company-response.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async getCompaniesByUserId(userId: number): Promise<CompanyResponseDto[]> {
    try {
      return await this.prisma.company.findMany({
        where: {
          ownerId: userId,
        },
      });
    } catch (error) {
      console.error(`Failed to fetch companies for user ${userId}`, error);
      throw error;
    }
  }
}
