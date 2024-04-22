import { ConfigService } from '@nestjs/config';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { JwtOptionsDto } from '../dto/jwt-options.dto';

export abstract class BaseMailType {
  protected abstract emailTemplate: string;
  protected readonly apiKey: string;
  protected readonly sender: string;
  protected readonly replaceWord: string;

  constructor(
    protected readonly configService: ConfigService,
    protected readonly sendGridService: SendGridService,
  ) {
    this.apiKey = this.configService.get('api.sendgrid.key');
    this.sender = this.configService.get('api.sendgrid.sender');
    this.replaceWord = this.configService.get('api.sendgrid.replaceWord');
  }

  abstract getJwtOptions(): JwtOptionsDto;

  async prepareReturnLink(
    payload: object,
    returnLink: string,
  ): Promise<string> {
    const jwtOptions = this.getJwtOptions();
    const token = JSON.stringify(payload); // TODO: Change to jwt
    returnLink = returnLink.replace(this.replaceWord, token);
    return returnLink;
  }

  async sendMail(email: string, templateData: object): Promise<void> {
    console.log(this.sender);
    await this.sendGridService.send({
      to: email,
      from: this.sender,
      dynamicTemplateData: templateData,
      templateId: this.emailTemplate,
    });
  }
}
