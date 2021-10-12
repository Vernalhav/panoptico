import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity({name: 'partidos'})
export default class PartyEntity {
  @PrimaryColumn({name: 'id'})
  id: number;

  @Column({name: 'sigla', length: 64})
  acronym: string;
  
  @Column({name: 'nome', length: 128})
  name: string;
}