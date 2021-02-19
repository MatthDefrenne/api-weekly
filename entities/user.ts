import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Photos } from './photos';
import { Schedules } from './schedules';
Schedules
@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;
  
  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column("int", { array: true, default: null })
  preferedCategoriesIds: number[];

}
