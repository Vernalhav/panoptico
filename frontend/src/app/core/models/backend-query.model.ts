import { Injectable } from '@angular/core';
import { Subject, Voting } from '../entities';
import { PublishableValue, SubscribableValue } from './common';

@Injectable()
export abstract class BackendQueryModel {
  protected _votingsFromMonitoredEntities = new PublishableValue<Voting[]>([]);
  protected _votingsFromMonitoredSubjects = new PublishableValue<Subject[]>([]);

  public get votingsFromMonitoredEntities(): SubscribableValue<Voting[]> {
    return this._votingsFromMonitoredEntities;
  }

  public get votingsFromMonitoredSubjects(): SubscribableValue<Subject[]> {
    return this._votingsFromMonitoredSubjects;
  }

  public clearQueryResults(): void {
    this._votingsFromMonitoredEntities.publish([]);
    this._votingsFromMonitoredSubjects.publish([]);
  }

  public abstract queryUsingCurrentFilters(): void;

  public abstract queryVotingsFromEntities(): void;

  public abstract querySubjectsFromEntities(): void;
}
