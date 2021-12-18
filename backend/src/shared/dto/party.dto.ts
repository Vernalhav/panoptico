import { CongresspersonDTO } from './congressperson.dto';

export class PartyDTO {
  constructor(
    public id: number,
    public acronym: string,
    public name: string,
    public totalMembers: number,
    public liderName: string,
    public members?: CongresspersonDTO[],
  ) {}
}

export class PartiesResponseDTO {
  constructor(public parties: PartyDTO[]) {}
}
