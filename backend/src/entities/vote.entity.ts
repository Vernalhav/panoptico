import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Congressperson, Party, Voting } from '.';

@Entity({ name: 'Vote' })
export class Vote {
  @PrimaryColumn()
  id: number;

  @Column()
  partyId: number;

  @Column()
  congresspersonId: number;

  @Column()
  votingId: number;

  @Column({ length: 24 })
  text: string;

  @Column()
  yes: boolean;

  @Column()
  no: boolean;

  @Column()
  other: boolean;

  @ManyToOne(() => Party)
  @JoinColumn({ name: 'partyId' })
  party: Party;

  @ManyToOne(() => Congressperson)
  @JoinColumn({ name: 'congresspersonId' })
  congressperson: Congressperson;

  @ManyToOne(() => Voting, (voting) => voting.votes)
  @JoinColumn({ name: 'votingId' })
  voting: Voting;
}
