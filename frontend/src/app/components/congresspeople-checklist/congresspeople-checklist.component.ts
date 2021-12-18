import { Component, Input } from '@angular/core';
import { MonitoredEntitiesController } from 'src/app/core/controllers';
import { Congressperson, Party } from 'src/app/core/entities';
import { MonitoredEntitiesView } from 'src/app/core/views';

@Component({
  selector: 'app-congresspeople-checklist',
  templateUrl: './congresspeople-checklist.component.html',
  styleUrls: ['./congresspeople-checklist.component.scss'],
})
export class CongresspeopleChecklistComponent {
  constructor(
    readonly view: MonitoredEntitiesView,
    readonly controller: MonitoredEntitiesController,
  ) {}

  @Input()
  congresspeopleByParty: Party[] = [];

  countSelected(party: Party) {
    return party.members.reduce((acc, member) => this.view.isCongresspersonMonitored[member.id] ? acc + 1: acc, 0);
  }

  handleOptionClick(member: Congressperson) {
    if (!this.view.isCongresspersonMonitored[member.id])
      this.controller.monitorCongressperson(member);
    else this.controller.stopMonitoringCongressperson(member);
  }
}
