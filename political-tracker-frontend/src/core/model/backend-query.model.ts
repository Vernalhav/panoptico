import { Injectable } from '@angular/core';
import { PublishableValue } from './common/publishable-value';
import { SubscribableValue } from './common/subscribable-value';
import { VotingBySubject } from './entities/voting-by-subject.entity';
import { Voting } from './entities/voting.entity';

@Injectable()
export abstract class BackendQueryModel {
  protected _votingsFromMonitoredEntities = new PublishableValue<Voting[]>([]);
  protected _votingsFromMonitoredSubjects = new PublishableValue<VotingBySubject[]>([]);

  public get votingsFromMonitoredEntities(): SubscribableValue<Voting[]> {
    return this._votingsFromMonitoredEntities;
  }

  public get votingsFromMonitoredSubjects(): SubscribableValue<VotingBySubject[]> {
    return this._votingsFromMonitoredSubjects;
  }

  public abstract queryUsingCurrentFilters(): void;
}
