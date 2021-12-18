import { Injectable } from '@angular/core';
import { CongresspersonLawCounts, LawCounts, PartyLawCounts, Subject, Voting } from '../entities';
import { PublishableValue, SubscribableValue } from './common';

@Injectable()
export abstract class BackendQueryModel {
  protected _votingsFromMonitoredEntities = new PublishableValue<Voting[]>([]);
  protected _votingsFromMonitoredSubjects = new PublishableValue<Subject[]>([]);
  protected _lawCountsFromCongressperson = new PublishableValue<CongresspersonLawCounts[]>([]);
  protected _lawCountsFromParties = new PublishableValue<PartyLawCounts[]>([]);

  public get votingsFromMonitoredEntities(): SubscribableValue<Voting[]> {
    return this._votingsFromMonitoredEntities;
  }

  public get lawCountsFromCongressperson(): SubscribableValue<CongresspersonLawCounts[]> {
    return this._lawCountsFromCongressperson;
  }

  public get lawCountsFromParties(): SubscribableValue<PartyLawCounts[]> {
    return this._lawCountsFromParties;
  }

  public get votingsFromMonitoredSubjects(): SubscribableValue<Subject[]> {
    return this._votingsFromMonitoredSubjects;
  }

  public clearQueryResults(): void {
    this._votingsFromMonitoredEntities.publish([]);
    this._votingsFromMonitoredSubjects.publish([]);
    this._lawCountsFromCongressperson.publish([]);
    this._lawCountsFromParties.publish([])
  }

  public abstract queryUsingCurrentFilters(): void;

  public abstract queryVotingsFromEntities(): void;

  public abstract querySubjectsFromEntities(): void;

  public abstract queryLawCountsFromEntities(): void;
}
