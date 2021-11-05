import { Component, Input } from '@angular/core';
import { MonitoredEntitiesController } from 'src/core/controller/monitored-entities.controller';
import { Congressperson } from 'src/core/model/entities/congressperson.entity';
import { Party } from 'src/core/model/entities/party.entity';
import { MonitoredEntitiesView } from 'src/core/view/monitored-entities.view';

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

  handleOptionClick(member: Congressperson) {
    if (!this.view.isCongresspersonMonitored[member.id])
      this.controller.monitorCongressperson(member);
    else this.controller.stopMonitoringCongressperson(member);
  }
}
