import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Establishment } from './establishment';
import { Events } from './events';

@Entity()
export class Schedules {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  week: string;

  @Column()
  day: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column({default: true})
  isClosed: boolean;
  
  @ManyToOne(type => Establishment, establishment => establishment.schedules, { nullable: true })
  establishment: Establishment;

  @ManyToOne(type => Events, establishment => establishment.schedules, { nullable: true })
  event: Events;

}
