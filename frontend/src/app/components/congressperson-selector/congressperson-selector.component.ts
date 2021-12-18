import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MonitoredEntitiesController } from 'src/app/core/controllers';
import { Congressperson, Party } from 'src/app/core/entities';
import { MonitoredEntitiesView } from 'src/app/core/views';

@Component({
  selector: 'app-congressperson-selector',
  templateUrl: './congressperson-selector.component.html',
  styleUrls: ['./congressperson-selector.component.scss']
})
export class CongresspersonSelectorComponent  {
  
  @Input() congresspeopleByParty: Party[] = [];

  @Input() buttonString: string = "Ver";

  @Output() congresspersonId = new EventEmitter<number>();

  public currentId: number = -1;
  
  constructor(
    readonly view: MonitoredEntitiesView,
    readonly controller: MonitoredEntitiesController,
  ) {}

  countSelected(party: Party) {
    return party.members.reduce((acc, member) => this.view.isCongresspersonMonitored[member.id] ? acc + 1: acc, 0);
  }

  handleOptionClick(member: Congressperson) {
    if (!this.view.isCongresspersonMonitored[member.id])
      this.controller.monitorCongressperson(member);
    else this.controller.stopMonitoringCongressperson(member);
  }

  emitCongressId(id: number) {
    this.currentId = id;
    this.congresspersonId.emit(id);
  }
}