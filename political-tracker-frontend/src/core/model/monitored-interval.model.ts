import { Injectable } from '@angular/core';
import { PublishableValue } from './common/publishable-value';
import { SubscribableValue } from './common/subscribable-value';

@Injectable()
export class MonitoredIntervalModel {
  private _start: PublishableValue<Date> = new PublishableValue(
    new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
  );
  private _end: PublishableValue<Date> = new PublishableValue(new Date());

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
