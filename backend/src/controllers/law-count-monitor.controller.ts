import { Controller, Get, Query } from "@nestjs/common";
import { LawCountMonitorService } from "src/services";

@Controller('law-counts')
export class LawCountMonitorController {
  constructor(
    private lawCountMonitorService: LawCountMonitorService
  ) {}

  @Get('party')
  async partyLawCounts(@Query('partyId') partyId: number = 36839) {
    return await this.lawCountMonitorService.getPartyLawCounts(partyId);
  }
}