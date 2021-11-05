import { Component, Input } from '@angular/core';
import { MonitoredEntitiesController } from 'src/core/controller/monitored-entities.controller';
import { Party } from 'src/core/model/entities/party.entity';
import { MonitoredEntitiesView } from 'src/core/view/monitored-entities.view';

@Component({
  selector: 'app-filterable-checklist',
  templateUrl: './filterable-checklist.component.html',
  styleUrls: ['./filterable-checklist.component.scss'],
})
export class FilterableChecklistComponent {
  constructor(
    readonly view: MonitoredEntitiesView,
    readonly controller: MonitoredEntitiesController,
  ) {}

  @Input()
  items: Party[] = [];

  handleOptionClick(party: Party) {
    if (!this.view.isPartyMonitored[party.id])
      this.controller.monitorParty(party);
    else this.controller.stopMonitoringParty(party);
  }
}
