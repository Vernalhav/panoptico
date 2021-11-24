type VotesByEntity = {
  entity: string;
  entityType: 'deputado' | 'partido';
  total: number;
  sim: number;
  nao: number;
  outros: number;
};

export class VotingBySubject {
  subject: string;
  votesByEntity: VotesByEntity[];

  constructor(
    subject: string,
    votesByEntity: VotesByEntity[] = [],
  ) {
    this.subject = subject;
    this.votesByEntity = votesByEntity;
  }
};