import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): Promise<User> {
    return this.userService.getHello();
  }
}
