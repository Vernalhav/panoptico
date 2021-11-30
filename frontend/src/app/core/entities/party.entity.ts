import { Congressperson } from '.';

export class Party {
  id: number;
  name: string;
  acronym: string;
  members: Congressperson[];

  constructor(
    id: number,
    name: string,
    acronym: string,
    members: Congressperson[] = [],
  ) {
    this.id = id;
    this.name = name;
    this.acronym = acronym;
    this.members = members;
  }
}
