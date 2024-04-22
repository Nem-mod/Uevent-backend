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
import { CreateUserGatewayDto } from './dto/create-user.gateway.dto';
import { UserGatewayService } from './user.gateway.service';

@Controller({
  version: '1',
  path: 'users',
})
export class UserGatewayController {
  constructor(private readonly userGatewayService: UserGatewayService) {}

  @Post(`register`)
  async registerUser(@Body() user: CreateUserGatewayDto) {
    return this.userGatewayService.registerUser(user);
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
