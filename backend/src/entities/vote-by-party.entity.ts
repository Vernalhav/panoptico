import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Party, Voting } from '.';

@Entity({ name: 'VoteByParty' })
export class VoteByParty {
  @PrimaryColumn()
  id: number;

  @Column()
  partyId: number;

  @Column()
  votingId: number;

  @Column()
  yes: number;

  @Column()
  no: number;

  @Column()
  other: number;

  @ManyToOne(() => Party)
  @JoinColumn({ name: 'partyId' })
  party: Party;

  @ManyToOne(() => Voting, (voting) => voting.partyVotes)
  @JoinColumn({ name: 'votingId' })
  voting: Voting;
}
