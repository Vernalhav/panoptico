import IAPICongressperson from './congressperson.interface';

export default interface IAPIParty {
  id: number;
  name: string;
  acronym: string;
  members?: IAPICongressperson[];
}
