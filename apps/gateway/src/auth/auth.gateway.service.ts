import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { IBaseUserMail } from './interfaces/base.user.mail.interface';

@Injectable()
export class AuthGatewayService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  async userSendVerifyEmail(userSendEmail: IBaseUserMail) {
    return await lastValueFrom(
      this.authClient.send({ cmd: 'sendUserVerifyEmail' }, userSendEmail).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }
}
