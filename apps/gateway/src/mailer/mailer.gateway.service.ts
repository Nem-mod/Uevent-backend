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
    return this.tokenClient
      .send(
        { role: 'user', token: 'verify', cmd: 'verifyAndClear' },
        {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0IjoidGVzdCIsInV1aWQiOiJjZDllMmU0MC1kNDBmLTRlZjgtOTY1NC03NTFjZTg2MmZkMTQiLCJpYXQiOjE3MTM5MTkwNjYsImV4cCI6MTcxMzkyOTg2Nn0.96SlzfurAkn-LzYUQuc6f7ARHnq5O3ybnAdHO98x_rU',
          id: 2,
        },
      )
      .pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      );
  }
}
