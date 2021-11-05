import { Controller, Get, Query} from '@nestjs/common';
import { VotingService } from './voting.service';
import arrayOrElementToArray from '../utils/index';

@Controller('votacoes')
export class VotingController {
  constructor(private votingService: VotingService) {}

  @Get()
  async getAll(
    @Query('partidos') partiesIds : number[] | number = [], 
    @Query('deputados') congresspersonIds: number[] | number = [],
    @Query('subjects') subjects: string[] | string = [],
    @Query('regexSubjects') regexSubjects: string[] | string = [],
    @Query('startDate') startDate: string = '2019-01-01',
    @Query('endDate') endDate: string = '2021-12-30'
  ) {
      
      regexSubjects = arrayOrElementToArray(regexSubjects);
      subjects = arrayOrElementToArray(subjects);
      partiesIds = arrayOrElementToArray(partiesIds);
      congresspersonIds = arrayOrElementToArray(congresspersonIds);
      
      console.log(regexSubjects, subjects);
      
      return await this.votingService.getAll(partiesIds, congresspersonIds, subjects, regexSubjects, startDate, endDate)
  }
}
