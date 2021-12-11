import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Congressperson } from ".";
import { Subject } from ".";

@Entity({ name: 'LawCountByAuthor' })
export class LawCountByAuthor {
  @Column()
  congresspersonId: number;

  @Column()
  subjectId: number;

  @Column()
  lawCount: number;

  @ManyToOne(() => Congressperson)
  @JoinColumn({ name: 'congresspersonId' })
  congressperson: Congressperson;

  @ManyToOne(() => Subject)
  @JoinColumn({ name: 'subjectId' })
  subject: Subject;
}