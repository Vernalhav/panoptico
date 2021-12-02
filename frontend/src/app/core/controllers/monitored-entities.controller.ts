import { Injectable } from '@angular/core';
import { Congressperson, Party } from '../entities';
import { MonitoredEntitiesModel } from '../models';

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
