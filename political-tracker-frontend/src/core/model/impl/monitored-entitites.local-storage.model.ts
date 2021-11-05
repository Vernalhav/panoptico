import { Injectable } from '@angular/core';
import { MonitoredEntitiesModel } from '../monitored-entities.model';

interface LocalStorageMonitoredEntities {
  parties: number[];
  congresspeople: number[];
}

@Injectable()
export class MonitoredEntitiesLocalStorageModel extends MonitoredEntitiesModel {
  private static readonly STORAGE_KEY = 'monitoredEntities';

  constructor() {
    super();
    this.deserialize();
    this._monitoredCongresspeopleIds.subscribe(async () => {
      this.serialize();
    });
    this._monitoredPartiesIds.subscribe(async () => {
      this.serialize();
    });
  }

  protected deserialize(): void {
    let parties: number[] = [];
    let congresspeople: number[] = [];
    try {
      const result = JSON.parse(
        localStorage.getItem(MonitoredEntitiesLocalStorageModel.STORAGE_KEY) +
          '',
      ) as LocalStorageMonitoredEntities;
      parties = result.parties;
      congresspeople = result.congresspeople;
    } catch (_) {
      localStorage.setItem(
        MonitoredEntitiesLocalStorageModel.STORAGE_KEY,
        JSON.stringify({
          parties: [],
          congresspeople: [],
        }),
      );
    } finally {
      this._monitoredCongresspeopleIds.publish(new Set(congresspeople));
      this._monitoredPartiesIds.publish(new Set(parties));
    }
  }

  protected serialize(): void {
    localStorage.setItem(
      MonitoredEntitiesLocalStorageModel.STORAGE_KEY,
      JSON.stringify({
        parties: Array.from(this._monitoredPartiesIds.value),
        congresspeople: Array.from(this._monitoredCongresspeopleIds.value),
      }),
    );
  }
}
