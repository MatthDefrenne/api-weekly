import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Establishment } from 'entities/establishment';
import { Photos } from 'entities/photos';
import { Schedules } from 'entities/schedules';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class SchedulesService {

    constructor(
        private connection: Connection,
      ) {}

      async addSchedules(schedules: Schedules[]): Promise<Schedules[]> {
        const scheduleRepo = this.connection.getRepository(Schedules);
          return Promise.all(schedules.map(async (schedule) => { 
            return await scheduleRepo.save(schedule) 
          }))
      }
}
