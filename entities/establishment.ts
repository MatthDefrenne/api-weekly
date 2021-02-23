import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { Photos } from './photos';
import { Schedules } from './schedules';
Schedules
@Entity()
export class Establishment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;
  
  @Column()
  firstname: string;

  @Column()
  lastName: string;

  @Column()
  name: string;

  @Column()
  telephone: string;

  @Column()
  url: string;

  @Column()
  description: string;

  @Column()
  adresse: string;

  @Column("int", { array: true })
  categoriesIds: number[];
  
  @OneToMany(type => Photos, photo => photo.establishment)
  photos: Photos[];

  @OneToMany(type => Schedules, schedule => schedule.establishment)
  schedules: Schedules[];

  @Column({ default: false })
  isActive: boolean;

  @Column()
  userId: string;

  @Column('geometry', {
    name: 'geo',
    nullable: true,
    spatialFeatureType: 'Point',
  })
  geoLocation: object;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

}
