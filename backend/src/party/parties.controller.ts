import { Controller, Get } from '@nestjs/common';
import { PartyService } from './party.service';

@Controller('partidos')
export class PartiesController {
  constructor(private partyService: PartyService) {}

  @Get()
  async getAll() {
    return await this.partyService.getAll();
  }

  @Get('membros')
  async getAllWithMembers() {
    return await this.partyService.getAllWithMembers();
  }
}
