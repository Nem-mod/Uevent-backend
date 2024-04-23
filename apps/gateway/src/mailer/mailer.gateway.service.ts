import { Inject, Injectable } from '@nestjs/common';
import { UserVerificationMailDto } from './dto/user-verification.mail.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

@Injectable()
export class MailerGatewayService {
  constructor(
    @Inject('MAILER_SERVICE') private readonly mailerClient: ClientProxy,
    @Inject('TOKEN_SERVICE') private readonly tokenClient: ClientProxy,
  ) {}

  async userEmailVerification(mailInfo: UserVerificationMailDto) {
    this.mailerClient.emit('user.verification', mailInfo);
  }

  async testToken() {
    return this.tokenClient.send({ cmd: 'tokenTest' }, {}).pipe(
      catchError((val) => {
        throw new RpcException(val);
      }),
    );
  }
}
