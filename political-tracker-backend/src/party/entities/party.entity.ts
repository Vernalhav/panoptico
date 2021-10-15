import CongresspersonEntity from 'src/congressperson/entities/congressperson.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity({name: 'partidos'})
export default class PartyEntity {
  
  @PrimaryColumn({name: 'id'})
  id: number;

  @Column({name: 'sigla', length: 64})
  acronym: string;
  
  @Column({name: 'nome', length: 128})
  name: string;

  @OneToMany(() => CongresspersonEntity, congressperson => congressperson.party)
  members: CongresspersonEntity[];
}