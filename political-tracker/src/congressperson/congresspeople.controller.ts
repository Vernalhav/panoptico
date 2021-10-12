import { Controller, Get, Param } from '@nestjs/common';
import { CongresspersonService } from './congressperson.service';


@Controller('deputados')
export class CongresspeopleController {
  constructor(private congresspersonService: CongresspersonService) {}

  @Get()
  async getCongresspeopleByParty() {
    return this.congresspersonService.getAllGroupedByParty();
  }
}
