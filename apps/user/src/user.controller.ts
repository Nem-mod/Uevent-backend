import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create.user.dto';
import { FullUserDto } from './dto/full.user.dto';
import { PostgresTypeormFilter } from '@app/common/database/typeorm/exceptions/postgres/postgres.typeorm.filter';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseFilters(new PostgresTypeormFilter())
  async createUser(@Body() user: CreateUserDto): Promise<FullUserDto> {
    return await this.userService.createUser(user);
  }
}
