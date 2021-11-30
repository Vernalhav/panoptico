import { SubscribableValue } from './subscribable-value';

export class PublishableValue<T> extends SubscribableValue<T> {
  constructor(value: T) {
    super(value);
  }

  public publish(value: T): void {
    this.value = value;
    this.eventBus.publish(value);
  }
}
