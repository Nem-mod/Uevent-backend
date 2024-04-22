import { Inject, Injectable } from '@nestjs/common';
import { UserVerificationMail } from './mail-types/user-verification.mail';
import { UserVerificationMailDto } from './dto/user-verification/user-verification.mail.dto';
import { IBaseMailType } from './interfaces/base.mail-type.interface';

@Injectable()
export class MailerService {
  constructor(
    @Inject('UserVerificationMail')
    private readonly userVerificationMail: IBaseMailType,
  ) {}

  async userEmailVerification(mailInfo: UserVerificationMailDto) {
    await this.userVerificationMail.execute(mailInfo);
  }
}
