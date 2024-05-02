import { BaseMailTypeSendgrid } from '../interfaces/base.mail-type.sendgrid';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendGridService } from '@anchan828/nest-sendgrid';
import * as _ from 'lodash';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { UserResetPswPayloadDto } from '../interfaces/dto/user-reset-psw/user-reset-psw.payload.dto';
import { UserResetPswMailDto } from '../interfaces/dto/user-reset-psw/user-reset-psw.mail.dto';
import { UserResetPswTemplateDataDto } from '../interfaces/dto/user-reset-psw/user-reset-psw.template-data.dto';

@Injectable()
export class UserResetPswMail extends BaseMailTypeSendgrid {
  protected emailTemplate: string;

  constructor(
    protected readonly configService: ConfigService,
    protected readonly sendGridService: SendGridService,
    @Inject('TOKEN_SERVICE') private readonly tokenClient: ClientProxy,
  ) {
    super(configService, sendGridService);
    this.emailTemplate = this.configService.get(
      'api.sendgrid.templates.user-reset-psw',
    );
  }

  async extractPayload(
    mailInfo: UserResetPswMailDto,
  ): Promise<UserResetPswPayloadDto> {
    return _.pick(
      mailInfo,
      Object.getOwnPropertyNames(new UserResetPswPayloadDto()),
    ) as UserResetPswPayloadDto;
  }

  async generateJwt(payload: UserResetPswPayloadDto): Promise<string> {
    return await lastValueFrom(
      this.tokenClient
        .send(
          { role: 'user', token: 'reset-psw', cmd: 'signAndClear' },
          { payload, id: payload.id },
        )
        .pipe(
          catchError((val) => {
            throw new RpcException(val);
          }),
        ),
    );
  }

  setTemplateData(mailInfo: UserResetPswMailDto): UserResetPswTemplateDataDto {
    return {
      link: mailInfo.returnLink,
    };
  }

  async prepareReturnLink(
    payload: UserResetPswPayloadDto,
    returnLink: string,
  ): Promise<string> {
    return await super.prepareReturnLink(payload, returnLink);
  }

  async sendMail(
    email: string,
    templateData: UserResetPswTemplateDataDto,
  ): Promise<void> {
    await super.sendMail(email, templateData);
  }

  async execute(mailInfo: UserResetPswMailDto): Promise<void> {
    await super.execute(mailInfo);
  }
}
