import { Inject, Injectable } from '@nestjs/common';
import { UserVerificationMailDto } from './dto/user-verification.mail.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MailerAuthService {
  constructor(
    @Inject('MAILER_SERVICE') private readonly mailerClient: ClientProxy,
  ) {}

  async userEmailVerification(mailInfo: UserVerificationMailDto) {
    this.mailerClient.emit('user.verification', mailInfo);
  }
}
