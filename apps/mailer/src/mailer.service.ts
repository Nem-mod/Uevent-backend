import { Inject, Injectable } from '@nestjs/common';
import { UserVerificationMailDto } from './dto/user-verification/user-verification.mail.dto';
import { IBaseMailType } from './interfaces/base.mail-type.interface';

@Injectable()
export class MailerService {
  constructor(
    @Inject('UserVerificationMail')
    private readonly userVerificationMail: IBaseMailType,
  ) {}

  async userEmailVerification(
    mailInfo: UserVerificationMailDto,
  ): Promise<void> {
    await this.userVerificationMail.execute(mailInfo);
  }
}
