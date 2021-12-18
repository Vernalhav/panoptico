import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { InvalidCongresspersonError, InvalidPartyIdError, LawCountMonitorService } from 'src/services';
import { arrayOrElementToArray } from 'src/shared/utils';
import { HttpException } from '@nestjs/common';

@Controller('law-counts')
export class LawCountMonitorController {
  constructor(private lawCountMonitorService: LawCountMonitorService) {}

  @Get()
  async lawCounts(
    @Query('congresspersonIds') congresspersonIds: number[] | number = [],
    @Query('partiesIds') partiesIds: number[] | number = [],
  ) {
    congresspersonIds = arrayOrElementToArray(congresspersonIds);
    partiesIds = arrayOrElementToArray(partiesIds);

    return await this.lawCountMonitorService.getLawCounts(congresspersonIds, partiesIds);
  }

  @Get('party')
  async partyLawCounts(@Query('partyId') partyId = 36839) {
    try{
      return await this.lawCountMonitorService.getPartyLawCounts(partyId);
    } catch (exception){
      return {};
    }
  }

  @Get('congressperson')
  async congresspersonLawCounts(@Query('congresspersonId') congresspersonId = 76874) {
    try {
      return await this.lawCountMonitorService.getCongresspersonLawCounts(congresspersonId);
    } catch (exception){
      return {};
    }
  }
}
