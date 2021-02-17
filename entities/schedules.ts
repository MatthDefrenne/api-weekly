import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Establishment } from './establishment';

@Entity()
export class Schedules {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column({default: true})
  isClosed: boolean;
  
  @ManyToOne(type => Establishment, establishment => establishment.schedules)
  establishment: Establishment;

}
