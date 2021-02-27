import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { Photos } from './photos';
import { Schedules } from './schedules';
@Entity()
export class Events {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startTime: Date;
  
  @Column()
  endTime: Date;

  @Column()
  name: string;

  @Column()
  telephone: string;

  @Column()
  url: string;

  @OneToMany(type => Photos, photo => photo.event)
  photos: Photos[];

  @OneToMany(type => Schedules, schedule => schedule.event)
  schedules: Schedules[];

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @Column('geometry', {
    name: 'geo',
    nullable: true,
    spatialFeatureType: 'Point',
  })
  geoLocation: object;

  @Column()
  adresse: string;
}
