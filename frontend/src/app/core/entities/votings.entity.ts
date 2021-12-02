import { Vote } from "./vote.entity";

export class Voting { 
  constructor(
    public votingId: number,
    public votingDate: string,
    public votes: Vote[]
  ) {}
}

export class MonitoredVotings{
  constructor( 
    public votings: Voting[]
  ) {}
}
