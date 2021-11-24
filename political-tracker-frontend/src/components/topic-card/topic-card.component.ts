import { Component, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { VotingBySubject } from 'src/core/model/entities/voting-by-subject.entity';

@Component({
  selector: 'app-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrls: ['./topic-card.component.scss']
})
export class TopicCardComponent {
  public title: string = '';

  public legend = false;
  public chartOptions: ChartOptions = {
    responsive: true,
  };
  public labels: Label[] = ['Sim', 'Não', 'Outros'];
  public dataSets: ChartDataSets[] = [];

  @Input() set voting(voting: VotingBySubject) {
    this.title = voting.subject;
    this.dataSets = voting.votesByEntity.map<ChartDataSets>((votes) => {
      return { data: [ votes.sim, votes.nao, votes.outros ], label: votes.entity, stack: 'a' };
    });
  }
}
