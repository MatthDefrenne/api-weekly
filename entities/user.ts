import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Photos } from './photos';
import { Schedules } from './schedules';
Schedules
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;
  
  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

}
