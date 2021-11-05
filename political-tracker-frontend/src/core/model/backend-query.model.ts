import { Injectable } from '@angular/core';
import { PublishableValue } from './common/publishable-value';
import { SubscribableValue } from './common/subscribable-value';
import { Voting } from './entities/voting.entity';

@Injectable()
export class BackendQueryModel {
  protected _votingsFromMonitoredEntities = new PublishableValue<Voting[]>([]);
  protected _votingsFromMonitoredSubjects = new PublishableValue<Voting[]>([]);

  public get votingsFromMonitoredEntities(): SubscribableValue<Voting[]> {
    return this._votingsFromMonitoredEntities;
  }

  public get votingsFromMonitoredSubjects(): SubscribableValue<Voting[]> {
    return this._votingsFromMonitoredSubjects;
  }
}
