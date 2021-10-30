import PartyEntity from 'src/party/entities/party.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'deputados' })
export default class CongresspersonEntity {
  @PrimaryColumn({ name: 'id' })
  id: number;

  @Column({ name: 'nomeEleitoral', length: 128 })
  name: string;

  @Column({ name: 'UF', length: 3 })
  state: string;

  @Column({ name: 'idPartido' })
  partyId: number;

  @ManyToOne(() => PartyEntity, (party) => party.members)
  @JoinColumn({ name: 'idPartido' })
  party: PartyEntity;
}
