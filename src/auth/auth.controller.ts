import { Controller, Request, Post, UseGuards, Get, Req, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(@Request() req) {
      return req.user;
    }

    @Get("/facebook")
    @UseGuards(AuthGuard("facebook"))
    async facebookLogin(): Promise<any> {
      return HttpStatus.OK;
    }
  
    @Get("/facebook/redirect")
    @UseGuards(AuthGuard("facebook"))
    async facebookLoginRedirect(@Req() req): Promise<any> {
      return {
        statusCode: HttpStatus.OK,
        data: req.user,
      };
    }
  
}
