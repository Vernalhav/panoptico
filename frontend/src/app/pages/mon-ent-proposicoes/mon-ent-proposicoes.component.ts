import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { CongresspersonLawCounts, PartyLawCounts } from 'src/app/core/entities';
import { BackendQueryModel } from 'src/app/core/models';
import { AvailablePartiesView } from 'src/app/core/views';

@Component({
  selector: 'app-mon-ent-proposicoes',
  templateUrl: './mon-ent-proposicoes.component.html',
  styleUrls: ['./mon-ent-proposicoes.component.scss']
})
export class MonEntProposicoesComponent implements OnInit{
  
  public isLoading = false;
  public isCheckedParties = true;
  public isCheckedCongresspeople = true;

  public checkedPartiesChanged(e: MatSlideToggleChange) {
    this.isCheckedParties = e.checked;
  }

  public checkedCongresspeopleChanged(e: MatSlideToggleChange) {
    this.isCheckedCongresspeople = e.checked;
  }

  constructor(
    readonly availablePartiesView: AvailablePartiesView,
    readonly backendQueryModel: BackendQueryModel
  ) {}

  ngOnInit(): void {
  }

  handleMonitorButton() {
    this.isLoading = true;
    this.backendQueryModel.clearQueryResults();
    this.backendQueryModel.queryLawCountsFromEntities();
  }

  mapCountsToWordData(partyLaws: PartyLawCounts[], congresLaws: CongresspersonLawCounts[]): {text: string, value: number}[] {
    let data: Map<string,{ text: string, value: number }> = new Map();

    for(let p of partyLaws){
      for(let lc of p.lawCounts){
        if(!data.has(lc.subject))
          data.set(lc.subject, { text: lc.subject, value: 0 });
        data.get(lc.subject)!.value += lc.count;
      }
    }

    for(let c of congresLaws){
      for(let lc of c.lawCounts){
        if(!data.has(lc.subject))
          data.set(lc.subject, { text: lc.subject, value: 0 });
        data.get(lc.subject)!.value += lc.count;
      }
    }

    return Array.from(data.values());
  }


}
