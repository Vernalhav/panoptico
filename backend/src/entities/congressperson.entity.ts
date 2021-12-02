import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Party } from '.';

@Entity({ name: 'Congressperson' })
export class Congressperson {
  @PrimaryColumn()
  id: number;

  @Column({ length: 128 })
  name: string;

  @Column({ length: 3 })
  state: string;

  @Column()
  partyId: number;

  @ManyToOne(() => Party, (party) => party.members)
  @JoinColumn({ name: 'partyId' })
  party: Party;
}
