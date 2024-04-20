import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FullUserDto } from './dto/full-user.dto';
import { PostgresTypeormFilter } from '@app/common/database/typeorm/exceptions/postgres/postgres.typeorm.filter';
import { UpdateUserDto } from './dto/update-user.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
@UseFilters(new PostgresTypeormFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'createUser' })
  async createUser(user: any): Promise<FullUserDto> {
    return await this.userService.createUser(user);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ): Promise<FullUserDto> {
    return await this.userService.updateUser(id, user);
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<FullUserDto> {
    return await this.userService.getUser(id);
  }

  // @Delete(':id')
  // async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
  //   return await this.userService.deleteUser(id);
  // }
}
