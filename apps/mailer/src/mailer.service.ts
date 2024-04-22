import { Injectable } from '@nestjs/common';
import { UserVerificationMail } from './mail-types/user-verification.mail';
import { UserVerificationMailDto } from './dto/user-verification/user-verification.mail.dto';
import { UserVerificationPayloadDto } from './dto/user-verification/user-verification.payload.dto';
import * as _ from 'lodash-es';
import { UserVerificationTemplateDataDto } from './dto/user-verification/user-verification.template-data.dto';
import mail from '@sendgrid/mail';

@Injectable()
export class MailerService {
  constructor(private readonly userVerificationMail: UserVerificationMail) {}

  async userEmailVerification(mailInfo: UserVerificationMailDto) {
    const payload = _.pick(
      mailInfo,
      Object.getOwnPropertyNames(new UserVerificationPayloadDto()),
    ) as UserVerificationPayloadDto;

    mailInfo.returnUrl = await this.userVerificationMail.prepareReturnLink(
      payload,
      mailInfo.returnUrl,
    );

    const templateData: UserVerificationTemplateDataDto = {
      link: mailInfo.returnUrl,
    };

    try {
      await this.userVerificationMail.sendMail(mailInfo.email, templateData);
    } catch (err) {
      console.log('here');
      console.error(err.response.body);
    }
  }
}
