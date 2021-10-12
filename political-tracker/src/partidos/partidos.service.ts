import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Partido } from './interfaces/partido.interface';

@Injectable()
export class PartidoService {

  constructor(private connection: Connection) {}

  async getAll(): Promise<Partido[]> {
    // const result = await this.connection.query('SELECT * FROM deputados') as Deputado[];
    // console.log(result);
    // return result;
    return [];
  }
}