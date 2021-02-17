import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { User } from 'entities/user';
import { UserService } from './user.service';
import { Response, Request } from 'express';

@Controller('user')
export class UserController {


    constructor(private userService: UserService) { }

    @Post()
    async create(@Res() res: Response, @Body() user: User): Promise<any> {
      const email = await this.userService.findByEmail(user);
      if (email) {
        return res.status(400).json({
            "statusCode": 400,
            "message": "Cette adresse email est déjà utilisée",
        });
      }
      const userCreated = await this.userService.create(user);
      res.status(HttpStatus.CREATED).json(userCreated);
    }
}
