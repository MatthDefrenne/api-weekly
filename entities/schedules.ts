import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Establishment } from './establishment';
import { Events } from './events';

@Entity()
export class Schedules {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: 0})
  week: number;

  @Column()
  day: number;

  @Column('time')
  startTime: Date;

  @Column('time')
  endTime: Date;

  @Column({default: true})
  isClosed: boolean;
  
  @ManyToOne(type => Establishment, establishment => establishment.schedules, { nullable: true })
  establishment: Establishment;

  @ManyToOne(type => Events, event => event.schedules, { nullable: true })
  event: Events;

}
