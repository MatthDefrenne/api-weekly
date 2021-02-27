import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Events } from 'entities/events';
import { EventService } from './event.service';
import { Response, Request } from 'express';

@Controller('event')
export class EventController {

    constructor(private eventService: EventService) {}
    
    @Post()
    async create(@Res() res: Response, @Body() event: Events): Promise<any> {
      await this.eventService.create(event);
      res.status(HttpStatus.OK).json([]);
    }
}
