import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';

@Injectable()
export class TopicService {
  private topics: string[] = undefined;
  
  constructor() { }
 
  async getAll() {
    if (this.topics) {
      return this.topics;
    }

    const topicList = await getConnection().manager.query('SELECT nome FROM topicos');
    this.topics = topicList.map(topic => topic.nome);
    return this.topics;
  }

  async getByRegexList(regexList: string[]): Promise<string[]> {
    const topicList = await this.getAll();
    
    const filterByRegex = (filteredArray: string[], topic: string) => {
      
      regexList.forEach((regex) => {
        try {
          if (new RegExp(regex).test(topic)) {
            filteredArray.push(topic);
            return filteredArray;
          }
        }
        catch {}
      });
      
      return filteredArray;
    };
    
    return topicList.reduce(filterByRegex, []);
  }
}