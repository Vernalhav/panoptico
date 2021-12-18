import { Component, OnInit } from '@angular/core';
import { MonitoredEntitiesController } from 'src/app/core/controllers';
import { Congressperson, Party } from 'src/app/core/entities';
import { AvailablePartiesView, MonitoredEntitiesView } from 'src/app/core/views';

@Component({
  selector: 'app-mon-parts-and-deps',
  templateUrl: './mon-parts-and-deps.component.html',
  styleUrls: ['./mon-parts-and-deps.component.scss']
})
export class MonPartsAndDepsComponent implements OnInit {

  currentParty: number | undefined = undefined;
  partyFilter: string = "";
  congressFilter: string = "";

  members: Congressperson[] = []

  constructor(
    readonly partiesView: AvailablePartiesView,
    readonly monitorView: MonitoredEntitiesView,
    readonly monitorController: MonitoredEntitiesController,
  ) {}

  ngOnInit(): void {
    
  }

  mapToNames(parties: Party[]): string[]{
    return parties.map(p => p.name)
  }

  
  mapToSorted(parties: Party[]): Party[]{
    return parties.sort((a,b) => b.totalMembers - a.totalMembers);
  }

  mapToMembers(parties: Party[]): Congressperson[] {
    if(this.currentParty === undefined)
      return [];
    
    for(let party of parties)
      if(party.id === this.currentParty){
        console.log('Retornou: ', party.members)
        return party.members;
      }

    return [];
  }

  getMembersNames(): string[] {
    return this.members.map(c => c.name);
  }
  
  eventHandlerPartyFilter (item: string){
    this.partyFilter = item;
  }

  eventHandlerCongressFilter (item: string){
    this.congressFilter = item;
  }

  updateCurrentParty(partyId: number){
    this.currentParty = partyId;
    this.members = this.mapToMembers(this.partiesView.availableParties)
  }

}