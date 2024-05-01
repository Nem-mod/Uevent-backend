import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe, Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { UserService } from './user.service';
import { ReqUser } from '../common/decorators/user-request.decorator';
import { AccessAuthGuard } from '../common/guards/access-auth.guard';
import { IUserUpdate } from './interfaces/user-update';

@Controller({
  version: '1',
  path: 'users',
})
export class UserController {
  constructor(private readonly userGatewayService: UserService) {}

  @Post(`register`)
  async registerUser(@Body() user: IUser): Promise<IUser> {
    return await this.userGatewayService.registerUser(user);
  }


  @UseGuards(AccessAuthGuard)
  @Patch()
  async updateUser(@ReqUser() { id }: IUser, @Body() user: IUserUpdate): Promise<IUser> {
    return await this.userGatewayService.updateUser(id, user);
  }

  @Get()
  async getAllUsers(): Promise<IUser[]> {
    return await this.userGatewayService.getAllUsers();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userGatewayService.deleteUser(id);
  }

  @UseGuards(AccessAuthGuard)
  @Get('me')
  async getMe(@ReqUser() user: IUser): Promise<IUser> {
    return user;
  }
}
