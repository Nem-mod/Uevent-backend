import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { UserSendEmailDto } from './dto/user.send-email.dto';
import { catchError, lastValueFrom } from 'rxjs';

@Injectable()
export class AuthGatewayService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  async userSendVerifyEmail(userSendEmail: UserSendEmailDto) {
    console.log(userSendEmail);
    return await lastValueFrom(
      this.authClient.send({ cmd: 'sendUserVerifyEmail' }, userSendEmail).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }
}
