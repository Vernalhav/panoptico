import { Injectable } from '@angular/core';
import { PublishableValue } from './common/publishable-value';
import { SubscribableValue } from './common/subscribable-value';
import { Congressperson } from './entities/congressperson.entity';
import { Party } from './entities/party.entity';

@Injectable()
export class MonitoredEntitiesModel {
  protected _monitoredCongresspeopleIds: PublishableValue<Set<number>> =
    new PublishableValue(new Set<number>());
  protected _monitoredPartiesIds: PublishableValue<Set<number>> =
    new PublishableValue(new Set<number>());

  public get monitoredCongresspeopleIds(): SubscribableValue<Set<number>> {
    return this._monitoredCongresspeopleIds;
  }

  public get monitoredPartiesIds(): SubscribableValue<Set<number>> {
    return this._monitoredPartiesIds;
  }

  public async monitorCongressperson(congressperson: Congressperson) {
    this._monitoredCongresspeopleIds.value.add(congressperson.id);
    this._monitoredCongresspeopleIds.publish(
      this._monitoredCongresspeopleIds.value,
    );
  }
  public async stopMonitoringCongressperson(congressperson: Congressperson) {
    this._monitoredCongresspeopleIds.value.delete(congressperson.id);
    this._monitoredCongresspeopleIds.publish(
      this._monitoredCongresspeopleIds.value,
    );
  }

  public async monitorParty(party: Party) {
    this._monitoredPartiesIds.value.add(party.id);
    this._monitoredPartiesIds.publish(this._monitoredPartiesIds.value);
  }
  public async stopMonitoringParty(party: Party) {
    this._monitoredPartiesIds.value.delete(party.id);
    this._monitoredPartiesIds.publish(this._monitoredPartiesIds.value);
  }
}
