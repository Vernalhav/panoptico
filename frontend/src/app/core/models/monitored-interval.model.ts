import { Injectable } from '@angular/core';
import { PublishableValue, SubscribableValue } from './common';

@Injectable()
export class MonitoredIntervalModel {
  protected _start: PublishableValue<Date> = new PublishableValue(
    new Date(2020, 4, 1)
  );
  protected _end: PublishableValue<Date> = new PublishableValue(new Date(2020, 4, 30));

  public get start(): SubscribableValue<Date> {
    return this._start;
  }

  public get end(): SubscribableValue<Date> {
    return this._end;
  }

  setStart(date: Date) {
    this._start.publish(date);
  }

  setEnd(date: Date) {
    this._end.publish(date);
  }
}
