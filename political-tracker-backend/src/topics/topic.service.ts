// Carrega lista de todos os tópicos do BD
// Filtra essa lista (na RAM) fazendo um array.filter()
//    com a condição de filtro sendo o match em algum
//    dos patterns
// retornar lista
import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';

@Injectable()
export class TopicService {
  constructor() {}
  
  async getTopicsByRegexList(regexList: string[]): Promise<string[]> {
    const topicList = await getConnection().manager.query('SELECT nome FROM topicos');
    
    const filterByRegex = (filteredArray, topic) => {
      
      regexList.forEach((regex) => {
        if (new RegExp(regex).test(topic.nome)) {
          filteredArray.push(topic.nome);
          return filteredArray;
        }
      });
      
      return filteredArray;
    };
    
    return topicList.reduce(filterByRegex, []);
  }
}