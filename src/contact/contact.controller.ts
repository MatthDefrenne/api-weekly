import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { Email } from 'node-mailjet';
import { Contact, EmailingService } from 'src/emailing/emailing.service';

@Controller('contact')
export class ContactController {

    constructor(private emailingService: EmailingService) { }
    @Post()
    async contactUs(@Res() res: Response, @Body() contact: Contact): Promise<any> {
      this.emailingService.contact(contact);
      res.status(HttpStatus.OK).json([]);
    }
}
