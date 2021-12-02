import { Party } from './party.entity';

export class Congressperson {
  id: number;
  name: string;
  state: string;
  party?: Party;

  public get partyAcronym() {
    return this.party ? this.party.acronym : 'Sem partido';
  }

  constructor(id: number, name: string, state: string, party?: Party) {
    this.id = id;
    this.name = name;
    this.state = state;
    this.party = party;
  }
}
