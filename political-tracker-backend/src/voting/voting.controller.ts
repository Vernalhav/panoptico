import { Controller, Get, Query} from '@nestjs/common';
import { VotingService } from './voting.service';

@Controller('votacoes')
export class VotingController {
  constructor(private votingService: VotingService) {}

  @Get()
  async getAll(
    @Query('partidos') partiesIds?: number[], 
    @Query('deputados') congresspersonIds?: number[],
    @Query('temas') subjects?: string[],
    @Query('regex') regexSubjects?: string[],
    @Query('inicio') startDate?: string,
    @Query('fim') endDate?: string
  ) {
      console.log(partiesIds)
      return await this.votingService.getAll(partiesIds, congresspersonIds, subjects, regexSubjects, startDate, endDate)
  }
}
