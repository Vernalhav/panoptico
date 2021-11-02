import { Injectable, InjectionToken, OnDestroy } from '@angular/core';
import { MonitoredKeyword } from '../model/entities/monitored-keyword.entity';
import { MonitoredKeywordsModel } from '../model/monitored-keywords.model';

export abstract class MonitoredKeywordsView {
  public monitoredKeywords: MonitoredKeyword[] = [];
}

@Injectable()
export class ConcreteMonitoredKeywordsView
  extends MonitoredKeywordsView
  implements OnDestroy
{
  private monitoredKeywordsSubscription?: string;

  constructor(private readonly model: MonitoredKeywordsModel) {
    super();
    this.monitoredKeywords = model.monitoredKeywords.value;
  }

  async update(monitoredKeywords: MonitoredKeyword[]) {
    this.monitoredKeywords = monitoredKeywords;
  }

  subscribeToModel() {
    this.monitoredKeywordsSubscription = this.model.monitoredKeywords.subscribe(
      this.update.bind(this),
    );
  }

  unsubscribeFromModel() {
    if (this.monitoredKeywordsSubscription)
      this.model.monitoredKeywords.unsubscribe(
        this.monitoredKeywordsSubscription,
      );
  }

  ngOnDestroy() {
    this.unsubscribeFromModel();
  }
}
