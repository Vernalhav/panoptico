import { EventBus } from './common/event-bus';
import { PublishableValue } from './common/publishable-value';
import { SubscribableValue } from './common/subscribable-value';
import { MonitoredKeyword } from './entities/monitored-keyword.entity';

export abstract class MonitoredKeywordsModel {
  protected eventBus: EventBus<MonitoredKeyword[]> = new EventBus<
    MonitoredKeyword[]
  >();

  protected _monitoredKeywords: PublishableValue<MonitoredKeyword[]> =
    new PublishableValue([] as MonitoredKeyword[]);
  public get monitoredKeywords(): SubscribableValue<MonitoredKeyword[]> {
    return this._monitoredKeywords;
  }

  public async add(monitoredKeyword: MonitoredKeyword) {
    this._monitoredKeywords.value.push(monitoredKeyword);
    this._monitoredKeywords.publish(this._monitoredKeywords.value);
  }

  public async remove(monitoredKeyword: MonitoredKeyword) {
    this._monitoredKeywords.publish(
      this._monitoredKeywords.value.filter(
        (mk) =>
          mk.isRegex !== monitoredKeyword.isRegex ||
          mk.word !== monitoredKeyword.word,
      ),
    );
  }
}

export class ConcreteMonitoredKeywordsModel extends MonitoredKeywordsModel {
  constructor() {
    super();
  }
}
