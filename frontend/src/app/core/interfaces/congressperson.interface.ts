import IAPIParty from './party.interface';

export default interface IAPICongressperson {
  id: number;
  name: string;
  state: string;
  partyId?: number;
  party?: IAPIParty;
}
