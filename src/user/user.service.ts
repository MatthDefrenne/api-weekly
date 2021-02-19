import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Establishment } from 'entities/establishment';
import { Photos } from 'entities/photos';
import { Schedules } from 'entities/schedules';
import { User } from 'entities/user';
import { throwError } from 'rxjs';
import { PhotosService } from 'src/photos/photos.service';
import { SchedulesService } from 'src/schedules/schedules.service';
import * as sha1 from 'sha1'
import { Connection, Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        private connection: Connection) {
    }

    async findOne(user: User): Promise<User> {
        try {
            const userRepo = this.connection.getRepository(User);
            return userRepo.findOne({where: {email: user.email, password: sha1(user.password)}})
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<User> {
        try {
            const userRepo = this.connection.getRepository(User);
            return userRepo.findOne(id);
        } catch (error) {
            throw error;
        }
    }

    async findByEmail(user: User): Promise<User> {
        try {
            const userRepo = this.connection.getRepository(User);
            return userRepo.findOne({where: {email: user.email, password: sha1(user.password)}})
        } catch (error) {
            throw error;
        }
    }

    async create(user: User) {
        try {
            const userRepo = this.connection.getRepository(User);
            user.password = sha1(user.password);
            return userRepo.save(user);
        } catch (error) {
            throw error;
        }
    }
}
