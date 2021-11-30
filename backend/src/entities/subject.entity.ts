import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';
import { Voting } from '.';

@Entity({ name: 'Subject' })
export class Subject {
  @PrimaryColumn()
  id: number;

  @Column({ length: 64 })
  name: string;

  @ManyToMany(() => Voting, voting => voting.subjects)
  @JoinTable({ name: 'SubjectVoting' })
  votings: Voting[];
}
