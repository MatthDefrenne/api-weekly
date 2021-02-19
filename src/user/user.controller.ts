import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { User } from 'entities/user';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

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

    @Get(':id')
    async getUserById(@Res() res: Response, @Param() id: number): Promise<any> {
      const user = await this.userService.findById(id);
      if (user) {
        res.status(HttpStatus.CREATED).json(user);
      }      
    }
}
