import { Controller, Get, Query } from '@nestjs/common';
import { VotingsMonitorService } from 'src/services';
import { VotingsMonitorResponseDTO } from 'src/shared/dto';
import { arrayOrElementToArray } from 'src/shared/utils';

@Controller('monitor')
export class VotingsMonitorController {
  constructor(private votingMonitorService: VotingsMonitorService) {}

  @Get()
  async entitiesActivities(
    @Query('startDate') startDate = '2019-01-01',
    @Query('endDate') endDate = '2021-12-30',
    @Query('partiesIds') partiesIds: number[] | number = [],
    @Query('congresspersonIds') congresspersonIds: number[] | number = [],
  ): Promise<VotingsMonitorResponseDTO> {
    partiesIds = arrayOrElementToArray(partiesIds);
    congresspersonIds = arrayOrElementToArray(congresspersonIds);

    return new VotingsMonitorResponseDTO(
      Object.values(
        await this.votingMonitorService.getVotingsByEntities(
          congresspersonIds,
          partiesIds,
          startDate,
          endDate,
        ),
      ),
    );
  }

  @Get('parties')
  async partiesActivities(
    @Query('startDate') startDate = '2019-01-01',
    @Query('endDate') endDate = '2021-12-30',
    @Query('partiesIds') partiesIds: number[] | number = [],
  ): Promise<VotingsMonitorResponseDTO> {
    partiesIds = arrayOrElementToArray(partiesIds);

    return new VotingsMonitorResponseDTO(
      Object.values(
        await this.votingMonitorService.getVotingsByParties(
          partiesIds,
          startDate,
          endDate,
        ),
      ),
    );
  }

  @Get('congresspeople')
  async congresspeopleActivities(
    @Query('startDate') startDate = '2019-01-01',
    @Query('endDate') endDate = '2021-12-30',
    @Query('congresspersonIds') congresspersonIds: number[] | number = [],
  ): Promise<VotingsMonitorResponseDTO> {
    congresspersonIds = arrayOrElementToArray(congresspersonIds);

    return new VotingsMonitorResponseDTO(
      Object.values(
        await this.votingMonitorService.getVotingsByCongresspeople(
          congresspersonIds,
          startDate,
          endDate,
        ),
      ),
    );
  }
}
