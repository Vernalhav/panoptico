import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Congressperson } from './interfaces/congressperson.interface'

@Injectable()
export class CongresspersonService {

  constructor(private connection: Connection) {}

  async getAll(): Promise<Congressperson[]> {
    const result = await this.connection.query('SELECT * FROM deputados') as Congressperson[];
    console.log(result);
    return result;
  }

  async getAllGroupedByParty(): Promise<Object> {
    const queryResult = await this.connection.query('SELECT d.id, d.nomeEleitoral, p.sigla FROM deputados d JOIN partidos p ON d.idPartido = p.id') as Object[];
    const result = {};

    queryResult.forEach((item) => {
      if (result[item['sigla']] === undefined) {
        result[item['sigla']] = [];
      }
      result[item['sigla']].push({ 'nomeEleitoral': item['nomeEleitoral'], 'id': item['id'] });
    });

    console.log(result);
    return result;
  }
}