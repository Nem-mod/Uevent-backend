import { Body, Controller, Post } from '@nestjs/common';
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
    try {
      return this.userGatewayService.registerUser(user);
    } catch (err) {
      console.log('here');
      console.log(err.getStatus());
      console.log(err.message);
    }
  }
}
