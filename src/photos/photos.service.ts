import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Establishment } from 'entities/establishment';
import { Photos } from 'entities/photos';
import { Schedules } from 'entities/schedules';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class PhotosService {

    constructor(
        private connection: Connection,
      ) {}

      async addPhotos(photos: Photos[]) {
        const photoRepo = this.connection.getRepository(Photos);
          return Promise.all(photos.map(async (photo: any) => { 
            const newPhoto = new Photos();
            newPhoto.url = photo;
            return await photoRepo.save(newPhoto) 
          }))
      }
}
