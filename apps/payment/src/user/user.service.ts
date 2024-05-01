import { Inject, Injectable } from '@nestjs/common';
import { catchError, lastValueFrom } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async getUserById(userId: number): Promise<IUser> {
    return await lastValueFrom(
      this.userClient.send<IUser>({ cmd: 'getUserById' }, userId).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }
}
