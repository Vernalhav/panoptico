export type VotesByEntity = {
  entity: string;
  entityType: 'deputado' | 'partido';
  total: number;
  sim: number;
  nao: number;
  outros: number;
};

export class Voting {
  id: string;
  date: string; 
  votes: VotesByEntity[];

  constructor(
    id: string,
    date: string,
    votes: VotesByEntity[] = [],
  ) {
    this.id = id;
    this.date = date;
    this.votes = votes;
  }
};