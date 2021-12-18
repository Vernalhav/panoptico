import { Controller, Get } from '@nestjs/common';
import { CongresspersonService } from 'src/services/congressperson.service';
import { CongresspeopleResponseDTO } from 'src/shared/dto';
import { CongresspeopleMapper } from 'src/shared/mappers';

@Controller('congressperson')
export class CongresspersonController {
  constructor(
    private congresspersonService: CongresspersonService,
    private congresspeopleMapper: CongresspeopleMapper,
  ) {}

  @Get()
  async getAll(): Promise<CongresspeopleResponseDTO> {
    const congresspeople = await this.congresspersonService.getAll();
    return new CongresspeopleResponseDTO(
      this.congresspeopleMapper.mapTo(congresspeople),
    );
  }
}
