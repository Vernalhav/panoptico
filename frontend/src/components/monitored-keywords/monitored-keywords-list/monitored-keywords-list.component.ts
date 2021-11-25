import { Component, Input } from '@angular/core';
import { MonitoredKeyword } from 'src/core/model/entities/monitored-keyword.entity';

@Component({
  selector: 'app-monitored-keywords-list',
  templateUrl: './monitored-keywords-list.component.html',
  styleUrls: ['./monitored-keywords-list.component.scss'],
})
export class MonitoredKeywordsListComponent {
  @Input() keywords: MonitoredKeyword[] = [];
}
