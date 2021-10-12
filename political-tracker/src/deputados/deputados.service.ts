import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Deputado } from './interfaces/deputado.interface'

@Injectable()
export class DeputadoService {

  constructor(private connection: Connection) {}

  async getAll(): Promise<Deputado[]> {
    const result = await this.connection.query('SELECT * FROM deputados') as Deputado[];
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