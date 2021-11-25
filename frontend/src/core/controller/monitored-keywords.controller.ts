import { Injectable } from '@angular/core';
import { MonitoredKeyword } from '../model/entities/monitored-keyword.entity';
import { MonitoredKeywordsModel } from '../model/monitored-keywords.model';

export abstract class MonitoredKeywordsController {
  public abstract addKeyword(keyword: string, isRegex: boolean): Promise<void>;
  public abstract removeKeyword(
    keyword: string,
    isRegex: boolean,
  ): Promise<void>;
}

@Injectable()
export class ConcreteMonitoredKeywordsController
  implements MonitoredKeywordsController
{
  constructor(private readonly model: MonitoredKeywordsModel) {}

  public async addKeyword(word: string, isRegex: boolean): Promise<void> {
    const keyword = new MonitoredKeyword(word, isRegex);
    this.model.add(keyword);
  }

  public async removeKeyword(word: string, isRegex: boolean): Promise<void> {
    const keyword = new MonitoredKeyword(word, isRegex);
    this.model.remove(keyword);
  }
}
