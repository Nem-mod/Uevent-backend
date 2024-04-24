import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ICreateUserGateway } from './interfaces/create-user.gateway.interface';
import { catchError, lastValueFrom } from 'rxjs';
import { FullUserDto } from '../../../user/src/dto/full-user.dto';

@Injectable()
export class UserGatewayService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async registerUser(user: ICreateUserGateway) {
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
