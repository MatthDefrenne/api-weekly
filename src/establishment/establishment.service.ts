import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Establishment } from 'entities/establishment';
import { Photos } from 'entities/photos';
import { Schedules } from 'entities/schedules';
import { connect } from 'node-mailjet';
import { throwError } from 'rxjs';
import { EmailingService } from 'src/emailing/emailing.service';
import { PhotosService } from 'src/photos/photos.service';
import { SchedulesService } from 'src/schedules/schedules.service';

import { Any, Connection, In, Raw, Repository } from 'typeorm';

@Injectable()
export class EstablishmentService {

    constructor(
        private connection: Connection,
        private schedulesService: SchedulesService,
        private photosService: PhotosService,
        private emailingService: EmailingService,
      ) {}

      async create(establishment: Establishment) {
        console.log(establishment);
        const establishmentRepo = this.connection.getRepository(Establishment);
        establishment.schedules = await this.schedulesService.addSchedules(establishment.schedules);
        establishment.photos = await this.photosService.addPhotos(establishment.photos);
        establishmentRepo.save(establishment);
      }

      async findEtablissmentByIds(ids: Number[]): Promise<Establishment[]> {
        const establishmentRepo = this.connection.getRepository(Establishment);
        return establishmentRepo.createQueryBuilder()
        .select("establishment")
        .from(Establishment, "establishment")
        .where("establishment.categoriesIds @> :ids ", { ids })
        .leftJoinAndSelect("establishment.photos", "photos")
        .leftJoinAndSelect("establishment.schedules", "schedules")
        .getMany();
      }

      async findAll(): Promise<Establishment[]>  {
        const establishmentRepo = this.connection.getRepository(Establishment);
        return establishmentRepo.find({relations: ['photos', 'schedules']});
      }

      async findByUserId(userId: string): Promise<Establishment[]>  {
        const establishmentRepo = this.connection.getRepository(Establishment);
        return establishmentRepo.createQueryBuilder()
        .select("establishment")
        .from(Establishment, "establishment")
        .where("establishment.userId == :userId", { userId })
        .leftJoinAndSelect("establishment.photos", "photos")
        .leftJoinAndSelect("establishment.schedules", "schedules")
        .getMany();
      }

      async approuveEstablishment(id: number) {
        const establishmentRepo = this.connection.getRepository(Establishment);
        const establishment = await establishmentRepo.findOne(id);
        establishment.isActive = true;
        this.emailingService.messageActivated(establishment);
        await establishmentRepo.save(establishment);
      }
}
