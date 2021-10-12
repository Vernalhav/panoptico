import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Deputado } from './interfaces/deputado.interface'

@Injectable()
export class DeputadoService {

  constructor(private connection: Connection) {}

  async findAll(): Promise<Deputado[]> {
    const result = await this.connection.query('SELECT * FROM deputados') as Deputado[];
    console.log(result);
    return result;
  }
}