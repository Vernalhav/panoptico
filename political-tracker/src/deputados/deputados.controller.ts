import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Controller('deputados')
export class DeputadosController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  @Get()
  async getDeputado() {
    const deputados = await this.connection.query('SELECT * from deputados');
    console.log(deputados);
    return deputados;
  }
}
