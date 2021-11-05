import { Injectable } from '@angular/core';
import { PublishableValue } from './common/publishable-value';
import { Voting } from './entities/voting.entity';

@Injectable()
export class BackendQueryModel {
  public _votingsFromMonitoredEntities = new PublishableValue<Voting[]>([]);
  public _votingsFromMonitoredSubjects = new PublishableValue<Voting[]>([]);
}
