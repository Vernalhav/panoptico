import { Component, Input, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
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
  public partiesData: ChartDataSets[] = [];
  public congresspeopleData: ChartDataSets[] = [];
  public filteredDataset: ChartDataSets[] = [];
  
  public isCheckedParties = true;
  public isCheckedCongresspeople = true;
  
  public checkedPartiesChanged(e: MatSlideToggleChange) {
    this.isCheckedParties = e.checked;
    this.updateFilteredData();
  }

  public checkedCongresspeopleChanged(e: MatSlideToggleChange) {
    this.isCheckedCongresspeople = e.checked;
    this.updateFilteredData();
  }

  private updateFilteredData() {
    this.filteredDataset = [];
    if (this.isCheckedParties)
      this.filteredDataset = this.filteredDataset.concat(this.partiesData);
    if (this.isCheckedCongresspeople)
      this.filteredDataset = this.filteredDataset.concat(this.congresspeopleData);
  }

  @Input() set voting(voting: VotingBySubject) {
    this.title = voting.subject;

    this.partiesData = voting.votesByEntity
      .filter((votes) => votes.entityType === 'partido')
      .map((votes) => {
        return { data: [ votes.sim, votes.nao, votes.outros ], label: votes.entity, stack: 'a' };
      });
    
    this.congresspeopleData = voting.votesByEntity
      .filter((votes) => votes.entityType === 'deputado')
      .map((votes) => {
        return { data: [ votes.sim, votes.nao, votes.outros ], label: votes.entity, stack: 'a' };
      });
    
      this.updateFilteredData();
  }
}
