import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { IUser } from './interfaces/user.interface';
import { catchError, lastValueFrom } from 'rxjs';
import { ILogin } from './interfaces/login.interface';

@Injectable()
export class UserAuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async getUserById(id: number): Promise<IUser> {
    return await lastValueFrom(
      this.userClient.send<IUser>({ cmd: 'getUserById' }, id).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }

  async getUserByEmail(email: string): Promise<IUser> {
    return await lastValueFrom(
      this.userClient.send<IUser>({ cmd: 'getUserByEmail' }, email).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }

  async verifyUser(login: ILogin): Promise<IUser> {
    return await lastValueFrom(
      this.userClient.send<IUser>({ cmd: 'verifyUser' }, login).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }

  async setUserVerified(id: number): Promise<void> {
    this.userClient.emit('setVerifyUser', id);
  }

  async changePassword(id: number, password: string) {
    await lastValueFrom(
      this.userClient.send({ cmd: 'changePsw' }, { id, password }).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }
}
