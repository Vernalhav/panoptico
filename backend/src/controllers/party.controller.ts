import { Controller, Get, Query } from '@nestjs/common';
import { PartyService } from 'src/services/party.service';
import { PartiesResponseDTO } from 'src/shared/dto';
import { PartiesMapper } from 'src/shared/mappers';

@Controller('party')
export class PartyController {
  constructor(
    private partyService: PartyService,
    private partiesMapper: PartiesMapper,
  ) {}

  @Get()
  async getAll(@Query('members') members: any): Promise<PartiesResponseDTO> {
    const parties = await (!!members
      ? this.partyService.getAllWithMembers()
      : this.partyService.getAll());
    return new PartiesResponseDTO(this.partiesMapper.mapTo(parties));
  }
}
