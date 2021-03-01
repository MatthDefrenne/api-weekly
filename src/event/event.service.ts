import { Injectable } from '@nestjs/common';
import { Events } from 'entities/events';
import { Photos } from 'entities/photos';
import { Schedules } from 'entities/schedules';
import { User } from 'entities/user';
import { EmailingService } from 'src/emailing/emailing.service';
import { PhotosService } from 'src/photos/photos.service';
import { SchedulesService } from 'src/schedules/schedules.service';
import { Connection } from 'typeorm';

@Injectable()
export class EventService {

    constructor(
        private connection: Connection,
        private schedulesService: SchedulesService,
        private photosService: PhotosService,
        private emailingService: EmailingService,
    ) {}

    async create(event: Events) {
        const eventRepo = this.connection.getRepository(Events);
        event.schedules = await this.schedulesService.addSchedules(event.schedules);
        event.photos = await this.photosService.addPhotos(event.photos);
        return eventRepo.save(event);
    }

    async update(event: Events) {
        const eventRepo = this.connection.getRepository(Events);
        const photosRepo = this.connection.getRepository(Photos);
        const schedules = this.connection.getRepository(Schedules);
        photosRepo.save(event.photos);
        schedules.save(event.schedules);
        return eventRepo.save(event);
    }

    async findOne(id): Promise<Events>  {
        const eventRepo = this.connection.getRepository(Events);
        return eventRepo.findOne(id, {relations: ['photos', 'schedules']});
    }

    async findAll(): Promise<Events[]>  {
        const eventRepo = this.connection.getRepository(Events);
        return eventRepo.find({relations: ['photos', 'schedules']});
    }

    async findByUserId(user: User): Promise<Events[]>  {
        const establishmentRepo = this.connection.getRepository(Events);
        return establishmentRepo.find({ where: { userId: user.id }, relations: ['photos', 'schedules']})
    }
}
