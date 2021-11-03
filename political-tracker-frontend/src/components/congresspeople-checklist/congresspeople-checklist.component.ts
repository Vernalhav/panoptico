import { Component, Input } from '@angular/core';
import { Party } from 'src/core/model/entities/party.entity';

@Component({
  selector: 'app-congresspeople-checklist',
  templateUrl: './congresspeople-checklist.component.html',
  styleUrls: ['./congresspeople-checklist.component.scss'],
})
export class CongresspeopleChecklistComponent {
  @Input()
  congresspeopleByParty: Party[] = [];
}
