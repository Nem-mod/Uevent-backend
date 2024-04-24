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
} from '@nestjs/common';
import { ICreateUserGateway } from './interfaces/create-user.gateway.interface';
import { UserGatewayService } from './user.gateway.service';
import { AuthGatewayService } from '../auth/auth.gateway.service';

@Controller({
  version: '1',
  path: 'users',
})
export class UserGatewayController {
  constructor(
    private readonly userGatewayService: UserGatewayService,
    private readonly authGatewayService: AuthGatewayService,
  ) {}

  @Post(`register`)
  async registerUser(@Body() user: ICreateUserGateway) {
    const newUser = await this.userGatewayService.registerUser(user);
    // await this.authGatewayService.sendUserVerifyEmail(newUser.id);
    return newUser;
  }

  @Get()
  async getAllUsers() {
    return await this.userGatewayService.getAllUsers();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.userGatewayService.deleteUser(id);
  }
}
