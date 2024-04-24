import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { IVerificationUserMail } from './interfaces/verification.user.mail.interface';
import { catchError, lastValueFrom } from 'rxjs';

@Injectable()
export class MailerAuthService {
  constructor(
    @Inject('MAILER_SERVICE') private readonly mailerClient: ClientProxy,
  ) {}

  async userEmailVerification(mailInfo: IVerificationUserMail): Promise<void> {
    await lastValueFrom(
      this.mailerClient
        .send({ role: 'user', mail: 'verification', cmd: 'send' }, mailInfo)
        .pipe(
          catchError((val) => {
            throw new RpcException(val);
          }),
        ),
    );
  }
}
