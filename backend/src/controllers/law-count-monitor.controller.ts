import { Controller, Get, Query } from '@nestjs/common';
import { LawCountMonitorService } from 'src/services';

@Controller('law-counts')
export class LawCountMonitorController {
  constructor(private lawCountMonitorService: LawCountMonitorService) {}

  @Get('party')
  async partyLawCounts(@Query('partyId') partyId = 36839) {
    return await this.lawCountMonitorService.getPartyLawCounts(partyId);
  }

  @Get('congressperson')
  async congresspersonLawCounts(@Query('congresspersonId') congresspersonId = 76874) {
    return await this.lawCountMonitorService.getCongresspersonLawCounts(congresspersonId);
  }
}
