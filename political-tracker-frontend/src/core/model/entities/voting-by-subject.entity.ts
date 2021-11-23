type VotesBySubject = {
  subject: string;
  total: number;
  sim: number;
  nao: number;
  outros: number;
};

export class VotingBySubject {
  id: number;
  entityName: string;
  type: string;
  subjects: VotesBySubject[];

  constructor(
    id: number,
    entityName: string,
    type: string,
    subjects: VotesBySubject[],
  ) {
    this.id = id;
    this.entityName = entityName;
    this.type = type;
    this.subjects = subjects;
  }
};