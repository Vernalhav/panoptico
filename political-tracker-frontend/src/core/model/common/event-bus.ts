export interface InternalSubscriptionList<EventType> {
  [key: string]: undefined | ((event: EventType) => Promise<any>);
}

export class EventBus<EventType> {
  private subscriptions = {} as InternalSubscriptionList<EventType>;

  public subscribe(id: string, callback: (event: EventType) => Promise<any>) {
    this.subscriptions[id] = callback;
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
