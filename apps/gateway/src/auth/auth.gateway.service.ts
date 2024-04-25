import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { IBaseUserMail } from './interfaces/base/base.user.mail.interface';
import { IBaseUserToken } from './interfaces/base/base.user.token.interface';
import { ILogin } from './interfaces/login.interface';

@Injectable()
export class AuthGatewayService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  async userSendVerifyEmail(userSendEmail: IBaseUserMail): Promise<boolean> {
    return await lastValueFrom(
      this.authClient.send({ cmd: 'sendUserVerifyEmail' }, userSendEmail).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }

  async userValidateVerifyToken(userToken: IBaseUserToken): Promise<boolean> {
    return await lastValueFrom(
      this.authClient.send({ cmd: 'validateUserVerifyToken' }, userToken).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }

  async login(login: ILogin) {
    return await lastValueFrom(
      this.authClient.send({ cmd: 'login' }, login).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }
}
