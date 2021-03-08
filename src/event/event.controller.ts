import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
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

    @Post('save')
    async save(@Res() res: Response, @Body() event: Events): Promise<any> {
      await this.eventService.save(event);
      res.status(HttpStatus.OK).json([]);
    }

    @Get('all')
    async findAll(@Res() res: Response): Promise<any> {
      const etabs = await this.eventService.findAll();
      res.status(HttpStatus.OK).json(etabs);
    }

    @Get('week')
    async findAllThisWeek(@Res() res: Response): Promise<any> {
      const etabs = await this.eventService.findAllThisWeek();
      res.status(HttpStatus.OK).json(etabs);
    }
    
    @Get('user/:id')
    async getMyEvent(@Res() res: Response, @Param() params): Promise<any> {
      const etabs = await this.eventService.findByUserId(params);
      res.status(HttpStatus.OK).json(etabs);
    }

    @Post('approuved')
    async approuved(@Res() res: Response, @Body() event: Events): Promise<any> {
      const etabs = await this.eventService.approuveEvent(event);
      res.status(HttpStatus.OK).json(etabs);
    }

}
