import { Injectable } from '@angular/core';

@Injectable()
export class MonitoredIntervalModel {
  start: Date;
  end: Date;

  constructor() {
    this.start = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    this.end = new Date();
  }
}
