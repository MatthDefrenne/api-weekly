import { Injectable } from '@nestjs/common';
import { Events } from 'entities/events';
import { Photos } from 'entities/photos';
import { Schedules } from 'entities/schedules';
import { User } from 'entities/user';
import { EmailingService } from 'src/emailing/emailing.service';
import { PhotosService } from 'src/photos/photos.service';
import { SchedulesService } from 'src/schedules/schedules.service';
import { Connection, LessThan, MoreThan } from 'typeorm';

@Injectable()
export class EventService {

    constructor(
        private connection: Connection,
        private schedulesService: SchedulesService,
        private photosService: PhotosService,
        private emailingService: EmailingService,
    ) {}

    async create(establishment: Events) {
        const establishmentRepo = this.connection.getRepository(Events);
        establishment.schedules = await this.schedulesService.addSchedules(establishment.schedules);
        establishment.photos = await this.photosService.addPhotos(establishment.photos);
        establishmentRepo.save(establishment);
      }

    async save(establishment: Events) {
        const establishmentRepo = this.connection.getRepository(Events);
        const photosRepo = this.connection.getRepository(Photos);
        const schedules = this.connection.getRepository(Schedules);
        photosRepo.save(establishment.photos);
        schedules.save(establishment.schedules);
        establishmentRepo.save(establishment);
    }

    async findOne(id): Promise<Events>  {
        const eventRepo = this.connection.getRepository(Events);
        return eventRepo.findOne(id, {relations: ['photos', 'schedules']});
    }

    async findAll(): Promise<Events[]>  {
        const eventRepo = this.connection.getRepository(Events);
        return eventRepo.find({relations: ['photos', 'schedules']});
    }

    async findAllThisWeek(): Promise<Events[]>  {
        const eventRepo = this.connection.getRepository(Events);
        const current = new Date();
        const first = current.getDate() - current.getDay();
        const last = first + 6;
        return eventRepo.find({where: {endTime: MoreThan(first), startTime: LessThan(last)}, relations: ['photos', 'schedules']});
    }

    async findByUserId(user: User): Promise<Events[]>  {
        const establishmentRepo = this.connection.getRepository(Events);
        return establishmentRepo.find({ where: { userId: user.id }, relations: ['photos', 'schedules']})
    }

    async approuveEvent(establishment: Events) {
        const establishmentRepo = this.connection.getRepository(Events);
        this.emailingService.messageActivatedEvent(establishment);
        await establishmentRepo.save(establishment);
    }
}
