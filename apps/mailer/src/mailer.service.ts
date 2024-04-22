import { Injectable } from '@nestjs/common';
import { UserVerificationMail } from './mail-types/user-verification.mail';
import { UserVerificationMailDto } from './dto/user-verification/user-verification.mail.dto';

@Injectable()
export class MailerService {
  constructor(private readonly userVerificationMail: UserVerificationMail) {}

  async userEmailVerification(mailInfo: UserVerificationMailDto) {
    await this.userVerificationMail.execute(mailInfo);
  }
}
