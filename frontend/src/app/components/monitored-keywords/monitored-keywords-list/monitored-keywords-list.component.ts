import { Component, Input } from '@angular/core';
import { MonitoredKeyword } from 'src/app/core/entities';

@Component({
  selector: 'app-monitored-keywords-list',
  templateUrl: './monitored-keywords-list.component.html',
  styleUrls: ['./monitored-keywords-list.component.scss'],
})
export class MonitoredKeywordsListComponent {
  @Input() keywords: MonitoredKeyword[] = [];
}
