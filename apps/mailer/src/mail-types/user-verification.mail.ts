import { BaseMailTypeSendgrid } from '../interfaces/base.mail-type.sendgrid';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { UserVerificationPayloadDto } from '../dto/user-verification/user-verification.payload.dto';
import { UserVerificationMailDto } from '../dto/user-verification/user-verification.mail.dto';
import { UserVerificationTemplateDataDto } from '../dto/user-verification/user-verification.template-data.dto';
import * as _ from 'lodash';

@Injectable()
export class UserVerificationMail extends BaseMailTypeSendgrid {
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

  async extractPayload(
    mailInfo: UserVerificationMailDto,
  ): Promise<UserVerificationPayloadDto> {
    return _.pick(
      mailInfo,
      Object.getOwnPropertyNames(new UserVerificationPayloadDto()),
    ) as UserVerificationPayloadDto;
  }

  generateJwt(payload: UserVerificationPayloadDto): string {
    return JSON.stringify(payload); // TODO: return jwt id and put it in payload
  }

  setTemplateData(
    mailInfo: UserVerificationMailDto,
  ): UserVerificationTemplateDataDto {
    return {
      link: mailInfo.returnLink,
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
