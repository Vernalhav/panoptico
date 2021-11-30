import { Injectable, OnDestroy } from '@angular/core';
import { MonitoredEntitiesModel } from '../models';

@Injectable()
export class MonitoredEntitiesView implements OnDestroy {
  private subscriptionCongresspeople?: string;
  private subscriptionParties?: string;
  public isCongresspersonMonitored: { [id: string]: true | undefined } = {};
  public isPartyMonitored: { [id: string]: true | undefined } = {};

  constructor(
    private readonly model: MonitoredEntitiesModel
  ) {
    this.assignCongresspeopleFromSet(
      this.model.monitoredCongresspeopleIds.value,
    );
    this.assignPartiesFromSet(this.model.monitoredPartiesIds.value);
    this.subscribeToModel();
  }

  assignCongresspeopleFromSet(set: Set<number>) {
    this.isCongresspersonMonitored = Array.from(set).reduce(
      (acc, id) => ({ ...acc, [id]: true }),
      {},
    );
  }

  assignPartiesFromSet(set: Set<number>) {
    this.isPartyMonitored = Array.from(set).reduce(
      (acc, id) => ({ ...acc, [id]: true }),
      {},
    );
  }

  subscribeToModel() {
    this.subscriptionCongresspeople =
      this.model.monitoredCongresspeopleIds.subscribe(async (set) => {
        this.assignCongresspeopleFromSet(set);
      });
    this.subscriptionParties = this.model.monitoredPartiesIds.subscribe(
      async (set) => {
        this.assignPartiesFromSet(set);
      },
    );
  }

  unsubscribeFromModel() {
    if (this.subscriptionCongresspeople) {
      this.model.monitoredCongresspeopleIds.unsubscribe(
        this.subscriptionCongresspeople,
      );
    }
    if (this.subscriptionParties) {
      this.model.monitoredPartiesIds.unsubscribe(this.subscriptionParties);
    }
  }

  ngOnDestroy() {
    this.unsubscribeFromModel();
  }
}
