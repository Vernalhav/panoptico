import { PartyDTO } from "./party.dto";

export class CongresspersonDTO { 
  constructor(
    public id: number, 
    public name: string, 
    public state: string, 
    public partyId: number, 
    public party?: PartyDTO){}
}

export class CongresspeopleResponseDTO {
  constructor(public congresspeople: CongresspersonDTO[]) {}
}