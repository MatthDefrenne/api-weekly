import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'entities/user';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private authService: AuthService) {
    super({
      clientID: 'process.env.APP_ID',
      clientSecret: 'process.env.APP_SECRET',
      callbackURL: "/facebook/redirect",
      scope: "email",
      profileFields: ["emails", "name"],
    });
  }

  async validate(user: User): Promise<any> {
    /*const validate = await this.authService.validateUser(user);
    if (!validate) {
      throw new UnauthorizedException();
    }
    return user;*/
  }
}
