import { Controller, Get } from '@nestjs/common';
import { PartyService } from './party.service';


@Controller('partidos')
export class PartiesController {
  constructor(private congresspersonService: PartyService) {}

  @Get()
  async getAll() {
    
  }
}
