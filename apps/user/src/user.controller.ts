import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { FullUserDto } from './dto/full-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

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

  @MessagePattern({ cmd: 'verifyUser' })
  async verifyUser(@Body() login: LoginDto): Promise<FullUserDto> {
    return await this.userService.verifyUser(login);
  }

  @MessagePattern({ cmd: 'getUserById' })
  async getUserById(id: number): Promise<FullUserDto> {
    return await this.userService.getUserById(id);
  }

  @MessagePattern({ cmd: 'getUserByEmail' })
  async getUserByEmail(email: string): Promise<FullUserDto> {
    return await this.userService.getUserByEmail(email);
  }

  @MessagePattern({ cmd: 'getAllUsers' })
  async getAllUsers(): Promise<FullUserDto[]> {
    return await this.userService.getAllUsers();
  }

  @EventPattern('deleteUser')
  async deleteUser(id: number): Promise<void> {
    await this.userService.deleteUser(id);
  }

  @EventPattern('setVerifyUser')
  async setVerifyUser(id: number): Promise<void> {
    await this.userService.setVerifyUser(id);
  }
}
