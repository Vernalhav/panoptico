import { VoteDTO } from '.';

export class VotingDTO {
  constructor(
    public votingId: number,
    public votingDate: string,
    public votes: VoteDTO[],
  ) {}
}

export class VotingsMonitorResponseDTO {
  constructor(public votings: VotingDTO[]) {}
}
