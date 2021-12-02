import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Subject, Vote, VoteByParty } from '.';

@Entity({ name: 'Voting' })
export class Voting {
  @PrimaryColumn()
  id: number;

  @Column({ length: 12 })
  date: string;

  @ManyToMany(() => Subject, subject => subject.votings)
  @JoinTable({ name: 'VotingSubject' })
  subjects: Subject[];

  @OneToMany(() => Vote, vote => vote.voting)
  votes: Vote[];

  @OneToMany(() => VoteByParty, vote => vote.voting)
  partyVotes: VoteByParty[];
}
