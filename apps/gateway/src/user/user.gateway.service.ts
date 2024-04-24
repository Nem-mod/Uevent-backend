import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateUserGatewayDto } from './dto/create-user.gateway.dto';
import { catchError, lastValueFrom } from 'rxjs';
import { FullUserDto } from '../../../user/src/dto/full-user.dto';

@Injectable()
export class UserGatewayService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async registerUser(user: CreateUserGatewayDto) {
    return lastValueFrom(
      this.userClient.send<FullUserDto>({ cmd: 'createUser' }, user).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }

  async getAllUsers() {
    return this.userClient.send({ cmd: 'getAllUsers' }, {}).pipe(
      catchError((val) => {
        throw new RpcException(val);
      }),
    );
  }

  async deleteUser(id: number): Promise<void> {
    this.userClient.emit('user.deleted', id);
  }
}
