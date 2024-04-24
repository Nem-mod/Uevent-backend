import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ICreateUserGateway } from './interfaces/create-user.gateway.interface';
import { catchError, lastValueFrom } from 'rxjs';
import { IFullUserGateway } from './interfaces/full-user.gateway.interface';

@Injectable()
export class UserGatewayService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async registerUser(user: ICreateUserGateway): Promise<IFullUserGateway> {
    return lastValueFrom(
      this.userClient.send<IFullUserGateway>({ cmd: 'createUser' }, user).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }

  async getAllUsers(): Promise<IFullUserGateway[]> {
    return await lastValueFrom(
      this.userClient.send<IFullUserGateway[]>({ cmd: 'getAllUsers' }, {}).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }

  async deleteUser(id: number): Promise<void> {
    this.userClient.emit('user.deleted', id);
  }
}
