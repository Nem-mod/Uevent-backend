import { BaseMailType } from '../interfaces/base.mail-type';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtOptionsDto } from '../dto/jwt-options.dto';
import { SendGridService } from '@anchan828/nest-sendgrid';

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

  getJwtOptions(): JwtOptionsDto {
    return undefined;
  }

  // protected prepareReturnLink(payload: object, returnLink: string): string {
  //
  // } TODO: change payload type
}
