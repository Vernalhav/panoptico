import { Component, Input, OnInit } from '@angular/core';
import Party from 'src/app/core/interfaces/party.interface';

@Component({
  selector: 'app-congresspeople-checklist',
  templateUrl: './congresspeople-checklist.component.html',
  styleUrls: ['./congresspeople-checklist.component.scss']
})
export class CongresspeopleChecklistComponent implements OnInit {

  @Input()
  congresspeopleByParty: Party[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
