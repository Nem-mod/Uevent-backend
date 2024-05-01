import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { FullUserDto } from './interfaces/dto/full-user.dto';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from './interfaces/dto/create-user.dto';
import { LoginDto } from './interfaces/dto/login.dto';
import { UpdateUserDto } from './interfaces/dto/update-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'createUser' })
  async createUser(user: CreateUserDto): Promise<FullUserDto> {
    return await this.userService.createUser(user);
  }

  @MessagePattern({ cmd: 'createNullUser' })
  async createNullUser(email: string): Promise<FullUserDto> {
    return await this.userService.createNullUser(email);
  }

  @MessagePattern({ cmd: 'updateUser' })
  async updateUser({ id, data: user }: { id: number; data: UpdateUserDto }) {
    return await this.userService.updateUser(id, user);
  }

  // @Patch(':id')
  // async updateUser(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() user: UpdateUserDto,
  // ): Promise<FullUserDto> {
  //   return await this.userService.updateUser(id, user);
  // }

  @MessagePattern({ cmd: 'verifyUser' })
  async verifyUser(login: LoginDto): Promise<FullUserDto> {
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
