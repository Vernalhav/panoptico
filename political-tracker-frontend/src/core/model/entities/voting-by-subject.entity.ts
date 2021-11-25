import { VotesByEntity } from './voting.entity';

export class VotingBySubject {
  subject: string;
  votesByEntity: VotesByEntity[];

  constructor(subject: string, votesByEntity: VotesByEntity[] = []) {
    this.subject = subject;
    this.votesByEntity = votesByEntity;
  }
}
