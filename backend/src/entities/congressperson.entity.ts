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

  @Column({ length: 256 })
  photoUrl: string;
  
  @Column({ length: 128 })
  email: string;

  @Column({ length: 128 })
  civilName: string;

  @Column({ length: 128 })
  scholarity: string;

  @Column({ length: 3 })
  birthState: string;

  @Column({ length: 128 })
  birthCity: string;

  @Column({ length: 1 })
  sex: string;

  @ManyToOne(() => Party, (party) => party.members)
  @JoinColumn({ name: 'partyId' })
  party: Party;
}
