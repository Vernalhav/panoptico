import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mon-parts-and-deps',
  templateUrl: './mon-parts-and-deps.component.html',
  styleUrls: ['./mon-parts-and-deps.component.scss']
})
export class MonPartsAndDepsComponent implements OnInit {

  partyFilter: string = "";
  congressFilter: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  eventHandlerPartyFilter (item: string){
    this.partyFilter = item;
  }

  eventHandlerCongressFilter (item: string){
    this.congressFilter = item;
  }

}
