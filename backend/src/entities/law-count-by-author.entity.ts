import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Congressperson } from '.';
import { Subject } from '.';

@Entity({ name: 'LawCountByAuthor' })
export class LawCountByAuthor {
  @PrimaryColumn()
  congresspersonId: number;

  @PrimaryColumn()
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
