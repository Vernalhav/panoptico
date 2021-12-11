import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Party, Subject } from ".";

@Entity({ name: 'LawCountByParty' })
export class LawCountByParty {
  @Column()
  partyId: number;

  @Column()
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