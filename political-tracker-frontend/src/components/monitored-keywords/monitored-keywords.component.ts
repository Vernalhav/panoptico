import { Component, OnInit } from '@angular/core';
import { MonitoredKeywordsController } from 'src/core/controller/monitored-keywords.controller';
import { MonitoredKeywordsView } from 'src/core/view/monitored-keywords.view';

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
