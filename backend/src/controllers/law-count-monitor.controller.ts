import { Controller, Get, Query } from '@nestjs/common';
import { LawCountMonitorService } from 'src/services';
import { arrayOrElementToArray } from 'src/shared/utils';

@Controller('law-counts')
export class LawCountMonitorController {
  constructor(private lawCountMonitorService: LawCountMonitorService) {}

  @Get()
  async lawCounts(
    @Query('congresspeopleIds') congresspeopleIds: number[] | number = [],
    @Query('partiesIds') partiesIds: number[] | number = [],
  ) {
    congresspeopleIds = arrayOrElementToArray(congresspeopleIds);
    partiesIds = arrayOrElementToArray(partiesIds);

    return await this.lawCountMonitorService.getLawCounts(congresspeopleIds, partiesIds);
  }


  @Get('party')
  async partyLawCounts(@Query('partyId') partyId = 36839) {
    return await this.lawCountMonitorService.getPartyLawCounts(partyId);
  }

  @Get('congressperson')
  async congresspersonLawCounts(@Query('congresspersonId') congresspersonId = 76874) {
    return await this.lawCountMonitorService.getCongresspersonLawCounts(congresspersonId);
  }
}
