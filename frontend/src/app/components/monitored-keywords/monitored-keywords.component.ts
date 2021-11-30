import { Component } from '@angular/core';
import { MonitoredKeywordsController } from 'src/app/core/controllers';
import { MonitoredKeywordsView } from 'src/app/core/views';

@Component({
  selector: 'app-monitored-keywords',
  templateUrl: './monitored-keywords.component.html',
  styleUrls: ['./monitored-keywords.component.scss'],
})
export class MonitoredKeywordsComponent {
  constructor(
    readonly view: MonitoredKeywordsView,
    readonly controller: MonitoredKeywordsController,
  ) {}
}
