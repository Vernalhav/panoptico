import { Injectable } from '@angular/core';
import { MonitoredEntitiesModel } from './monitored-entities.model';
import { MonitoredIntervalModel } from './monitored-interval.model';
import { MonitoredKeywordsModel } from './monitored-keywords.model';

@Injectable()
export class BackendQueryModel {
  public get params() {
    return {
      parties: Array.from(this.monitoredEntities.monitoredPartiesIds.value),
      congresspeople: Array.from(
        this.monitoredEntities.monitoredCongresspeopleIds.value,
      ),
      keywords: Array.from(
        this.monitoredKeywords.monitoredKeywords.value
          .filter((k) => !k.isRegex)
          .map((k) => k.word),
      ),
      regex: Array.from(
        this.monitoredKeywords.monitoredKeywords.value

          .filter((k) => k.isRegex)
          .map((k) => k.word),
      ),
      start: this.monitoredInterval.start.toISOString().slice(0, 10),
      end: this.monitoredInterval.end.toISOString().slice(0, 10),
    };
  }

  constructor(
    readonly monitoredEntities: MonitoredEntitiesModel,
    readonly monitoredKeywords: MonitoredKeywordsModel,
    readonly monitoredInterval: MonitoredIntervalModel,
  ) {}
}
