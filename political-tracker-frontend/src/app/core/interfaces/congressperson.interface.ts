import Party from "./party.interface";

export default interface Congressperson { 
    id: number, 
    name: string, 
    state: string,
    partyId?: number,
    party?: Party,
}