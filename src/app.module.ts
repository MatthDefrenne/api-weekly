import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablishmentController } from './establishment/establishment.controller';
import { EstablishmentService } from './establishment/establishment.service';
import { Establishment } from 'entities/establishment';
import { Photos } from 'entities/photos';
import { Schedules } from 'entities/schedules';
import { SchedulesService } from './schedules/schedules.service';
import { PhotosService } from './photos/photos.service';
import { MulterModule } from '@nestjs/platform-express';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { User } from 'entities/user';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { LocalStrategy } from './auth/local.strategy';
import { FacebookStrategy } from './auth/facebook.strategy';
import { EmailingService } from './emailing/emailing.service';
import { ContactController } from './contact/contact.controller';
import { Events } from 'entities/events';
import { EventService } from './event/event.service';
import { EventController } from './event/event.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'promotions',
      database: 'weekly',
      entities: [Establishment, Photos, Schedules, User, Events],
      synchronize: true,
    }),
    MulterModule.register({
      dest: './upload',
    })
  ],
  controllers: [AppController, EstablishmentController, UserController, AuthController, ContactController, EventController],
  providers: [
    AppService, 
    EstablishmentService, 
    SchedulesService, 
    PhotosService, 
    UserService, 
    AuthService,
    FacebookStrategy,
    LocalStrategy,
    EmailingService,
    EventService,
  ],
})
export class AppModule {}
