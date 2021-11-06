import { EventBus } from './event-bus';

export class SubscribableValue<T> {
  value: T;
  protected eventBus = new EventBus<T>();

  constructor(value: T) {
    this.value = value;
  }

  subscribe: (callback: (value: T) => Promise<any>, id?: string) => string =
    this.eventBus.subscribe.bind(this.eventBus);

  unsubscribe: (id: string) => void = this.eventBus.unsubscribe.bind(
    this.eventBus,
  );
}
