import { Injectable } from '@nestjs/common';
import { User } from 'entities/user';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(user: User): Promise<any> {
    const userToFind = await this.userService.findOne(user);
    if (userToFind) {
      return userToFind;
    }
    return null;
  }
}
