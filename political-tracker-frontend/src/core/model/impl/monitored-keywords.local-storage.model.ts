import { MonitoredKeyword } from '../entities/monitored-keyword.entity';
import { MonitoredKeywordsModel } from '../monitored-keywords.model';

const isString = (value: any): value is string => typeof value === 'string';

export class MonitoredKeywordsLocalStorageModel extends MonitoredKeywordsModel {
  public static readonly KEY_MONITORED_KEYWORDS: string = 'monitoredKeywords';
  public static readonly KEY_MONITORED_KEYWORDS_LAST_UPDATE: string =
    'monitoredKeywordsLastUpdate';

  constructor() {
    super();
    this._monitoredKeywords.publish(this.retrieveFromLocalStorage());
    this._monitoredKeywords.subscribe(this.sync.bind(this));
  }

  add(keyword: MonitoredKeyword) {
    return super.add(keyword);
  }

  remove(keyword: MonitoredKeyword) {
    return super.remove(keyword);
  }

  private serialize(kw: MonitoredKeyword) {
    return {
      word: kw.word + '',
      isRegex: !!kw.isRegex,
    };
  }

  private deserialize(value: any) {
    if (!value || !isString(value.word)) return null;
    const kw = new MonitoredKeyword(value.word + '', !!value.isRegex);
    return kw;
  }

  private retrieveFromLocalStorage() {
    let value = null;
    try {
      value = JSON.parse(
        localStorage.getItem(
          MonitoredKeywordsLocalStorageModel.KEY_MONITORED_KEYWORDS,
        ) + '',
      );
    } catch (e) {
      value = null;
    }
    if (!Array.isArray(value)) return [];
    return value
      .map(this.deserialize)
      .filter((x) => x !== null) as MonitoredKeyword[];
  }

  private async sync() {
    const valueToSave = JSON.stringify(
      this._monitoredKeywords.value.map(this.serialize),
    );
    localStorage.setItem(
      MonitoredKeywordsLocalStorageModel.KEY_MONITORED_KEYWORDS,
      valueToSave,
    );
  }
}
