import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FullUserDto } from './dto/full-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'createUser' })
  async createUser(user: CreateUserDto): Promise<FullUserDto> {
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

  @MessagePattern({ cmd: 'getAllUsers' })
  async getAllUsers(): Promise<FullUserDto[]> {
    return await this.userService.getAllUsers();
  }

  @EventPattern('user.deleted')
  async deleteUser(id: number): Promise<void> {
    return await this.userService.deleteUser(id);
  }
}
