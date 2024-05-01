import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { IUser } from './interfaces/user.interface';
import { catchError, lastValueFrom } from 'rxjs';
import { IUserUpdate } from './interfaces/user-update';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async registerUser(user: IUser): Promise<IUser> {
    return lastValueFrom(
      this.userClient.send<IUser>({ cmd: 'createUser' }, user).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }

    async updateUser(id: number, user: IUserUpdate): Promise<IUser> {
        return lastValueFrom(
            this.userClient.send<any>({ cmd: 'updateUser' }, { id: id, data: user }).pipe(
                catchError((val) => {
                    throw new RpcException(val);
                }),
            ),
        );
    }
  async getAllUsers(): Promise<IUser[]> {
    return await lastValueFrom(
      this.userClient.send<IUser[]>({ cmd: 'getAllUsers' }, {}).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }

  async getUserById(id: number): Promise<IUser> {
    return await lastValueFrom(
      this.userClient.send<IUser>({ cmd: 'getUserById' }, id).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }

  async deleteUser(id: number): Promise<void> {
    this.userClient.emit('deleteUser', id);
  }
}
