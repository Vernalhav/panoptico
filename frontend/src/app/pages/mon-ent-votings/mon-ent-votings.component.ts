import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { BackendQueryModel } from 'src/app/core/models';
import { AvailablePartiesView } from 'src/app/core/views';

@Component({
  selector: 'app-mon-ent-votings',
  templateUrl: './mon-ent-votings.component.html',
  styleUrls: ['./mon-ent-votings.component.scss']
})
export class MonEntVotingsComponent implements OnInit {
  
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
    this.backendQueryModel.queryUsingCurrentFilters();
  }
}
