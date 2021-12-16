import { Component, OnInit } from '@angular/core';
import { Party } from 'src/app/core/entities';
import { BackendQueryModel } from 'src/app/core/models';
import { AvailablePartiesView } from 'src/app/core/views';

@Component({
  selector: 'app-mon-ent-votings',
  templateUrl: './mon-ent-votings.component.html',
  styleUrls: ['./mon-ent-votings.component.scss']
})
export class MonEntVotingsComponent implements OnInit {
  
  constructor(
    readonly availablePartiesView: AvailablePartiesView,
    readonly backendQueryModel: BackendQueryModel
  ) {}

  ngOnInit(): void {
  }

  handleMonitorButton() {
    this.backendQueryModel.queryUsingCurrentFilters();
    // this.router.navigate(['votings']);
  }
}
