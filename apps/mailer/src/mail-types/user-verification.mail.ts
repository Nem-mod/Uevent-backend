import { BaseMailType } from '../interfaces/base.mail-type';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { UserVerificationPayloadDto } from '../dto/user-verification/user-verification.payload.dto';
import * as _ from 'lodash-es';
import { UserVerificationMailDto } from '../dto/user-verification/user-verification.mail.dto';
import { UserVerificationTemplateDataDto } from '../dto/user-verification/user-verification.template-data.dto';

@Injectable()
export class UserVerificationMail extends BaseMailType {
  protected emailTemplate: string;

  constructor(
    protected readonly configService: ConfigService,
    protected readonly sendGridService: SendGridService,
  ) {
    super(configService, sendGridService);
    this.emailTemplate = this.configService.get(
      'api.sendgrid.templates.user-verify',
    );
  }

  extractPayload(
    mailInfo: UserVerificationMailDto,
  ): UserVerificationPayloadDto {
    return _.pick(
      mailInfo,
      Object.getOwnPropertyNames(new UserVerificationPayloadDto()),
    ) as UserVerificationPayloadDto;
  }

  generateJwt(payload: UserVerificationPayloadDto): string {
    return JSON.stringify(payload);
  }

  setTemplateData(
    mailInfo: UserVerificationMailDto,
  ): UserVerificationTemplateDataDto {
    return {
      link: mailInfo.returnUrl,
    };
  }

  async prepareReturnLink(
    payload: UserVerificationPayloadDto,
    returnLink: string,
  ): Promise<string> {
    return await super.prepareReturnLink(payload, returnLink);
  }

  async sendMail(
    email: string,
    templateData: UserVerificationTemplateDataDto,
  ): Promise<void> {
    await super.sendMail(email, templateData);
  }

  async execute(mailInfo: UserVerificationMailDto): Promise<void> {
    await super.execute(mailInfo);
  }
}
