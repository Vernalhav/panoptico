import { Injectable } from '@angular/core';
import { MonitoredIntervalModel } from '../model/monitored-interval.model';

@Injectable()
export class MonitoredIntervalController {
  constructor(readonly model: MonitoredIntervalModel) {}

  setStart(date: Date) {
    return this.model.setStart(date);
  }

  setEnd(date: Date) {
    return this.model.setEnd(date);
  }
}
