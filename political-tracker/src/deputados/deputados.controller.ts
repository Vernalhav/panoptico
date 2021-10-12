import { Controller, Get, Param } from '@nestjs/common';
import { DeputadoService } from './deputados.service';


@Controller('deputados')
export class DeputadosController {
  constructor(private deputadoService: DeputadoService) {}

  @Get()
  async getDeputadosByParty() {
    return this.deputadoService.getAllGroupedByParty();
  }
}
