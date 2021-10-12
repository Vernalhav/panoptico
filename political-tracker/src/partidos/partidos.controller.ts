import { Controller, Get } from '@nestjs/common';
import { PartidoService } from './partidos.service';


@Controller('partidos')
export class PartidoController {
  constructor(private deputadoService: PartidoService) {}

  @Get()
  async getAll() {
    
  }
}
