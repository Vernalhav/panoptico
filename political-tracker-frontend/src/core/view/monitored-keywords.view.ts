import { Injectable, InjectionToken } from '@angular/core';
import { MonitoredKeyword } from '../model/entities/monitored-keyword.entity';
import { MonitoredKeywordsModel } from '../model/monitored-keywords.model';

export abstract class MonitoredKeywordsView {
  public monitoredKeywords: MonitoredKeyword[] = [];
}

@Injectable()
export class ConcreteMonitoredKeywordsView extends MonitoredKeywordsView {
  constructor(model: MonitoredKeywordsModel) {
    super();
    model.subscribe(this.update.bind(this));
  }

  async update(monitoredKeywords: MonitoredKeyword[]) {
    this.monitoredKeywords = monitoredKeywords;
  }
}
