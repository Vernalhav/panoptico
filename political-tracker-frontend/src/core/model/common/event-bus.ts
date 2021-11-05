import { v4 } from 'uuid';

export interface InternalSubscriptionList<EventType> {
  [key: string]: undefined | ((event: EventType) => Promise<any>);
}

export class EventBus<EventType> {
  private subscriptions = {} as InternalSubscriptionList<EventType>;

  public subscribe(callback: (event: EventType) => Promise<any>, _id?: string) {
    const id = _id || v4();
    this.subscriptions[id] = callback;
    return id;
  }

  public unsubscribe(id: string) {
    delete this.subscriptions[id];
  }

  public publish(event: EventType) {
    Object.keys(this.subscriptions).forEach((id) =>
      this.runCallback(id, event),
    );
  }

  private runCallback(id: string, event: EventType) {
    const callback = this.subscriptions[id];

    if (!callback) {
      this.unsubscribe(id);
    } else {
      try {
        callback(event).catch(() => this.unsubscribe(id));
      } catch (_) {
        this.unsubscribe(id);
      }
    }
  }
}
