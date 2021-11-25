import { Injectable } from '@angular/core';
import { Congressperson } from '../model/entities/congressperson.entity';
import { Party } from '../model/entities/party.entity';
import { MonitoredEntitiesModel } from '../model/monitored-entities.model';

@Injectable()
export class MonitoredEntitiesController {
  constructor(private readonly model: MonitoredEntitiesModel) {}

  public async monitorParty(party: Party) {
    await this.model.monitorParty(party);
  }

  public async monitorCongressperson(cp: Congressperson) {
    await this.model.monitorCongressperson(cp);
  }

  public async stopMonitoringParty(party: Party) {
    await this.model.stopMonitoringParty(party);
  }

  public async stopMonitoringCongressperson(cp: Congressperson) {
    await this.model.stopMonitoringCongressperson(cp);
  }
}
