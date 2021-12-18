import { Component, Input } from '@angular/core';
import { MonitoredEntitiesController } from 'src/app/core/controllers';
import { MonitoredEntitiesView } from 'src/app/core/views';
import { Party } from 'src/app/core/entities';

@Component({
  selector: 'app-parties-checklist',
  templateUrl: './parties-checklist.component.html',
  styleUrls: ['./parties-checklist.component.scss'],
})
export class PartiesChecklistComponent {
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
