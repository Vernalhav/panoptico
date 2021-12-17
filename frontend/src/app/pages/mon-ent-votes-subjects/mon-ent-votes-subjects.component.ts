import { Component, OnInit } from '@angular/core';
import { BackendQueryModel } from 'src/app/core/models';
import { AvailablePartiesView } from 'src/app/core/views';

@Component({
  selector: 'app-mon-ent-votes-subjects',
  templateUrl: './mon-ent-votes-subjects.component.html',
  styleUrls: ['./mon-ent-votes-subjects.component.scss']
})
export class MonEntVotesSubjectsComponent implements OnInit {
  
  public isLoading = false;

  constructor(
    readonly availablePartiesView: AvailablePartiesView,
    readonly backendQueryModel: BackendQueryModel
  ) {}

  ngOnInit(): void {}

  handleMonitorButton() {
    this.isLoading = true;
    this.backendQueryModel.clearQueryResults();
    this.backendQueryModel.querySubjectsFromEntities();
  }

}
