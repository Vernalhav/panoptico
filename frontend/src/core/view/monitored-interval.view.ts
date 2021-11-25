import { Injectable, OnDestroy } from '@angular/core';
import { MonitoredIntervalModel } from '../model/monitored-interval.model';

@Injectable()
export class MonitoredIntervalView implements OnDestroy {
  start: Date;
  end: Date;
  private unsubscribeFNs: (() => void)[] = [];

  constructor(private readonly model: MonitoredIntervalModel) {
    this.start = this.model.start.value;
    this.end = this.model.end.value;
    this.setup();
  }

  private setup() {
    const subIds = [
      this.model.start.subscribe(async (value) => (this.start = value)),
      this.model.end.subscribe(async (value) => (this.end = value)),
    ];

    const unsubFNs = [
      () => this.model.start.unsubscribe(subIds[0]),
      () => this.model.end.unsubscribe(subIds[1]),
    ];

    this.unsubscribeFNs.push(...unsubFNs);
  }

  private teardown() {
    this.unsubscribeFNs.forEach((unsubscribe) => unsubscribe());
  }

  ngOnDestroy() {
    this.teardown();
  }
}
