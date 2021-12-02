import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Congressperson, VoteByParty } from '.';

@Entity({ name: 'Party' })
export class Party {
  @PrimaryColumn()
  id!: number;

  @Column({ length: 64 })
  acronym: string;

  @Column({ length: 128 })
  name: string;

  @OneToMany(
    () => Congressperson,
    (congressperson) => congressperson.party,
  )
  members: Congressperson[];

  @OneToMany(
    () => VoteByParty,
    (vote) => vote.partyId,
  )
  votes: VoteByParty[];
}
