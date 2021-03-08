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
  email: string;
  
  @Column()
  town: string;

  @Column()
  adresse: string;

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

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  isPermanent: boolean;

  @Column('geometry', {
    name: 'geo',
    nullable: true,
    spatialFeatureType: 'Point',
  })
  geoLocation: object;

  @Column()
  userId: string;
}
