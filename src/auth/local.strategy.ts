import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'entities/user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({usernameField: 'email', passwordField: 'password' })
  }

  async validate(email, password): Promise<any> {
    const user = { email, password } as User
    const validate = await this.authService.validateUser(user);
    if (!validate) {
      throw new UnauthorizedException();
    }
    return validate;
  }
}
