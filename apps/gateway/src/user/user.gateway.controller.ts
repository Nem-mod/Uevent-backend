import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post, Req, UseGuards,
} from '@nestjs/common';
import { ICreateUserGateway } from './interfaces/create-user.gateway.interface';
import { UserGatewayService } from './user.gateway.service';
import { IFullUserGateway } from './interfaces/full-user.gateway.interface';
import {Request as RequestType} from "express";
import {AccessJwtAuthGuard} from "../guards/access-jwt-auth.guard";

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
  async getMe(@Req() req: RequestType): Promise<IFullUserGateway> {
    return req.user as IFullUserGateway;
  }

}
