import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Party } from './interfaces/party.interface';

@Injectable()
export class PartyService {

  constructor(private connection: Connection) {}

  async getAll(): Promise<Party[]> {
    // const result = await this.connection.query('SELECT * FROM deputados') as Deputado[];
    // console.log(result);
    // return result;
    return [];
  }
}