import { Component, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { Voting } from 'src/core/model/entities/voting.entity';

@Component({
  selector: 'app-voting-card',
  templateUrl: './voting-card.component.html',
  styleUrls: ['./voting-card.component.scss'],
})
export class VotingCardComponent {
  public title = '';
  public votingId = '';
  public legend = false;
  public chartOptions: ChartOptions = {
    responsive: true,
  };
  public labels: Label[] = ['Sim', 'Não', 'Outros'];
  public partiesData: ChartDataSets[] = [];
  public congresspeopleData: ChartDataSets[] = [];
  public filteredDataset: ChartDataSets[] = [];

  public _includeParties = true;
  public _includeCongresspeople = true;

  private updateFilteredData() {
    this.filteredDataset = [];
    if (this._includeParties)
      this.filteredDataset = this.filteredDataset.concat(this.partiesData);
    if (this._includeCongresspeople)
      this.filteredDataset = this.filteredDataset.concat(
        this.congresspeopleData,
      );
  }

  @Input() set includeParties(val: boolean) {
    this._includeParties = val;
    this.updateFilteredData();
  }

  @Input() set includeCongresspeople(val: boolean) {
    this._includeCongresspeople = val;
    this.updateFilteredData();
  }

  @Input() set voting(voting: Voting) {
    this.title = `Votação ${voting.id}`;
    this.votingId = voting.id;

    this.partiesData = voting.votes
      .filter((votes) => votes.entityType === 'partido')
      .map((votes) => {
        return {
          data: [votes.sim, votes.nao, votes.outros],
          label: votes.entity,
          stack: 'a',
        };
      });

    this.congresspeopleData = voting.votes
      .filter((votes) => votes.entityType === 'deputado')
      .map((votes) => {
        return {
          data: [votes.sim, votes.nao, votes.outros],
          label: votes.entity,
          stack: 'a',
        };
      });

    this.updateFilteredData();
  }
}
