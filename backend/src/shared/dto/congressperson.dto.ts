import { PartyDTO } from './party.dto';

export class CongresspersonDTO {
  constructor(
    public id: number,
    public name: string,
    public state: string,
    public partyId: number,
    public photoUrl: string,
    public email: string,
    public civilName: string,
    public scholarity: string,
    public birthState: string,
    public birthCity: string,
    public sex: string,
    public party?: PartyDTO,
  ) {}
}

export class CongresspeopleResponseDTO {
  constructor(public congresspeople: CongresspersonDTO[]) {}
}
