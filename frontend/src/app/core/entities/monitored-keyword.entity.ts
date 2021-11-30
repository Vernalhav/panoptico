export class MonitoredKeyword {
  word: string;
  isRegex: boolean;

  constructor(word: string, isRegex: boolean) {
    this.word = word;
    this.isRegex = isRegex;
  }

  static Regex(word: string): MonitoredKeyword {
    return new MonitoredKeyword(word, true);
  }

  static Plain(word: string): MonitoredKeyword {
    return new MonitoredKeyword(word, false);
  }
}
