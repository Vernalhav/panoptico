import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Party, Subject } from ".";

@Entity({ name: 'LawCountByParty' })
export class LawCountByParty {
  @PrimaryColumn()
  partyId: number;

  @PrimaryColumn()
  subjectId: number;

  @Column()
  lawCount: number;

  @ManyToOne(() => Party)
  @JoinColumn({ name: 'partyId' })
  party: Party;

  @ManyToOne(() => Subject)
  @JoinColumn({ name: 'subjectId' })
  subject: Subject;
}