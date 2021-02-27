import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Establishment } from 'entities/establishment';
import { Photos } from 'entities/photos';
import { Schedules } from 'entities/schedules';
import { User } from 'entities/user';
import { connect } from 'node-mailjet';
import { throwError } from 'rxjs';
import { EmailingService } from 'src/emailing/emailing.service';
import { PhotosService } from 'src/photos/photos.service';
import { SchedulesService } from 'src/schedules/schedules.service';

import { Any, Connection, In, Raw, Repository } from 'typeorm';


export interface IFilter {
  ids: Number[];
  day: string;
  distance: { longitude: number, latitude: number, radius: number };
}

@Injectable()
export class EstablishmentService {

    constructor(
        private connection: Connection,
        private schedulesService: SchedulesService,
        private photosService: PhotosService,
        private emailingService: EmailingService,
      ) {}

      async create(establishment: Establishment) {
        const establishmentRepo = this.connection.getRepository(Establishment);
        establishment.schedules = await this.schedulesService.addSchedules(establishment.schedules);
        establishment.photos = await this.photosService.addPhotos(establishment.photos);
        establishmentRepo.save(establishment);
      }

      async save(establishment: Establishment) {
        const establishmentRepo = this.connection.getRepository(Establishment);
        const photosRepo = this.connection.getRepository(Photos);
        const schedules = this.connection.getRepository(Schedules);
        photosRepo.save(establishment.photos);
        schedules.save(establishment.schedules);
        establishmentRepo.save(establishment);
      }

      async findEtablissmentByIds(filter: IFilter): Promise<Establishment[]> {
        const establishmentRepo = this.connection.getRepository(Establishment);
        return establishmentRepo.createQueryBuilder()
        .select("establishment")
        .from(Establishment, "establishment")
        .where("establishment.categoriesIds @> :ids ", { ids: filter.ids })
        .where("ST_DWithin(establishment.geoLocation, ST_MakePoint(:longitude,:latitude)::geography, :radius)", {
          longitude: filter.distance.longitude,
          latitude: filter.distance.latitude,
          radius: filter.distance.radius * 1000
        })
        .leftJoinAndSelect("establishment.photos", "photos")
        .leftJoinAndSelect("establishment.schedules", "schedules", "schedules.day = :day AND schedules.isClosed = false", { day: filter.day })
        .getMany();
      }

      async findAll(): Promise<Establishment[]>  {
        const establishmentRepo = this.connection.getRepository(Establishment);
        return establishmentRepo.find({relations: ['photos', 'schedules']});
      }

      async findOne(id): Promise<Establishment>  {
        const establishmentRepo = this.connection.getRepository(Establishment);
        return establishmentRepo.findOne(id, {relations: ['photos', 'schedules']});
      }

      async findByUserId(user: User): Promise<Establishment[]>  {
        const establishmentRepo = this.connection.getRepository(Establishment);
        return establishmentRepo.find({ where: { userId: user.id }, relations: ['photos', 'schedules']})
      }

      async approuveEstablishment(id: number) {
        const establishmentRepo = this.connection.getRepository(Establishment);
        const establishment = await establishmentRepo.findOne(id);
        establishment.isActive = true;
        this.emailingService.messageActivated(establishment);
        await establishmentRepo.save(establishment);
      }
}
