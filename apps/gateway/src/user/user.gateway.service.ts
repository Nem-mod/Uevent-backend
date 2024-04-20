import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateUserGatewayDto } from './dto/create.user.gateway.dto';
import { catchError } from 'rxjs';

@Injectable()
export class UserGatewayService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async registerUser(user: CreateUserGatewayDto) {
    return this.userClient.send({ cmd: 'createUser' }, user).pipe(
      catchError((val) => {
        throw new RpcException(val);
      }),
    );
  }
}
