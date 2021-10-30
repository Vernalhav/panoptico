import { v4 as uuid } from 'uuid';
import { EventBus } from './common/event-bus';
import { MonitoredKeyword } from './entities/monitored-keyword.entity';

export abstract class MonitoredKeywordsModel {
  private monitoredKeywords: MonitoredKeyword[] = [];
  private eventBus: EventBus<MonitoredKeyword[]> = new EventBus<
    MonitoredKeyword[]
  >();

  public subscribe(
    callback: (monitoredKeywords: MonitoredKeyword[]) => Promise<any>,
  ) {
    const id = uuid();
    this.eventBus.subscribe(id, callback);
    callback(this.monitoredKeywords);
    return id;
  }

  public unsubscribe(id: string) {
    this.eventBus.unsubscribe(id);
  }

  public async add(monitoredKeyword: MonitoredKeyword) {
    this.monitoredKeywords.push(monitoredKeyword);
    this.eventBus.publish(this.monitoredKeywords);
  }

  public async remove(monitoredKeyword: MonitoredKeyword) {
    this.monitoredKeywords = this.monitoredKeywords.filter(
      (mk) =>
        mk.isRegex !== monitoredKeyword.isRegex ||
        mk.word !== monitoredKeyword.word,
    );
    this.eventBus.publish(this.monitoredKeywords);
  }
}

export class ConcreteMonitoredKeywordsModel extends MonitoredKeywordsModel {
  constructor() {
    super();
  }
}
