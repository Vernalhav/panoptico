import { Component, Input } from '@angular/core';
import { Voting } from 'src/core/model/entities/voting.entity';

@Component({
  selector: 'app-voting-card',
  templateUrl: './result-bar-chart.component.html',
  styleUrls: ['./result-bar-chart.component.scss'],
})
export class ResultBarChartComponent {
  @Input() voting!: Voting;
}
