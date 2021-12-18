import { Component, Input } from '@angular/core';
import { MonitoredKeywordsController } from 'src/app/core/controllers';

@Component({
  selector: 'app-monitored-keyword-list-item',
  templateUrl: './monitored-keyword-list-item.component.html',
  styleUrls: ['./monitored-keyword-list-item.component.scss'],
})
export class MonitoredKeywordListItemComponent {
  @Input() isRegex!: boolean;
  @Input() word!: string;

  constructor(readonly controller: MonitoredKeywordsController) {}

  onDelete() {
    this.controller.removeKeyword(this.word, this.isRegex);
  }
}
