import { Injectable } from "@angular/core";
import { MonitoredIntervalModel } from "..";

@Injectable()
export class MonitoredIntervalLocalStorageModel extends MonitoredIntervalModel {
  private static readonly START_STORAGE_KEY = 'monitoredIntervalStart';
  private static readonly END_STORAGE_KEY = 'monitoredIntervalEnd';

  constructor() {
    super();
    const [start, end] = this.retrieveFromLocalStorage();
    this._start.publish(start);
    this._end.publish(end);
    this._start.subscribe(this.saveStart.bind(this));
    this._end.subscribe(this.saveEnd.bind(this));
  }

  private retrieveFromLocalStorage(): [Date, Date] {
    const start = new Date(localStorage.getItem(MonitoredIntervalLocalStorageModel.START_STORAGE_KEY) || this._start.value);
    const end = new Date(localStorage.getItem(MonitoredIntervalLocalStorageModel.END_STORAGE_KEY) || this._end.value);
    return [ start, end ];
  }

  private async saveStart(start: Date) {
    localStorage.setItem(MonitoredIntervalLocalStorageModel.START_STORAGE_KEY, start.toDateString())
  }
  
  private async saveEnd(end: Date) {
    localStorage.setItem(MonitoredIntervalLocalStorageModel.END_STORAGE_KEY, end.toDateString())
  }
}