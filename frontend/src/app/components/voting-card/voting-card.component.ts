import { Component, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { Voting } from 'src/app/core/entities';

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
    this.title = `Votação ${voting.votingId}`;
    this.votingId = voting.votingId.toString();

    this.partiesData = voting.votes
      .filter((votes) => votes.entity === 'party')
      .map((votes) => {
        return {
          data: [votes.yes, votes.no, votes.other],
          label: votes.entityName,
          stack: 'a',
        };
      }) as ChartDataSets[];

    this.congresspeopleData = voting.votes
      .filter((votes) => votes.entity === 'congressperson')
      .map((votes) => {
        return {
          data: [votes.yes, votes.no, votes.other],
          label: votes.entityName,
          stack: 'a',
        };
      }) as ChartDataSets[];

    this.updateFilteredData();
  }
}
