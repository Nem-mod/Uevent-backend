import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ICreateUserGateway } from './interfaces/create-user.gateway.interface';
import { UserGatewayService } from './user.gateway.service';
import { IFullUserGateway } from './interfaces/full-user.gateway.interface';
import { AccessJwtAuthGuard } from '../guards/access-jwt-auth.guard';
import { ReqUser } from '../decorators/user.decorator';

@Controller({
  version: '1',
  path: 'users',
})
export class UserGatewayController {
  constructor(private readonly userGatewayService: UserGatewayService) {}

  @Post(`register`)
  async registerUser(
    @Body() user: ICreateUserGateway,
  ): Promise<IFullUserGateway> {
    return await this.userGatewayService.registerUser(user);
  }

  @Get()
  async getAllUsers(): Promise<IFullUserGateway[]> {
    return await this.userGatewayService.getAllUsers();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userGatewayService.deleteUser(id);
  }

  @UseGuards(AccessJwtAuthGuard)
  @Get('me')
  async getMe(@ReqUser() user: IFullUserGateway): Promise<IFullUserGateway> {
    return user;
  }
}
