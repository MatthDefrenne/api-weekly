import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Establishment } from './establishment';
import { Events } from './events';

@Entity()
export class Photos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;
  
  @ManyToOne(type => Establishment, author => author.photos)
  establishment: Establishment;

  @ManyToOne(type => Events, author => author.photos)
  event: Events;

}
