import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {IVerificationUserMail} from "./interfaces/verification.user.mail.interface";

@Injectable()
export class MailerAuthService {
  constructor(
    @Inject('MAILER_SERVICE') private readonly mailerClient: ClientProxy,
  ) {}

  async userEmailVerification(mailInfo: IVerificationUserMail) {
    this.mailerClient.emit('user.verification', mailInfo);
  }
}
