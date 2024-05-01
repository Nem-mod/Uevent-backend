import { ConfigService } from '@nestjs/config';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { IBaseMailType } from './base.mail-type.interface';

export abstract class BaseMailTypeSendgrid implements IBaseMailType {
  protected abstract emailTemplate: string;
  protected readonly apiKey: string;
  protected readonly sender: string;
  protected readonly replaceWord: string;

  protected constructor(
    protected readonly configService: ConfigService,
    protected readonly sendGridService: SendGridService,
  ) {
    this.apiKey = this.configService.get('api.sendgrid.key');
    this.sender = this.configService.get('api.sendgrid.sender');
    this.replaceWord = this.configService.get('api.sendgrid.replaceWord');
  }

  abstract extractPayload(mailInfo: object): Promise<object>;

  abstract generateJwt(payload: object): Promise<string>;

  async prepareReturnLink(
    payload: object,
    returnLink: string,
  ): Promise<string> {
    console.log(payload);
    const token = await this.generateJwt(payload);
    console.log(token);
    returnLink = returnLink.replace(this.replaceWord, token);
    console.log(returnLink);
    return returnLink;
  }

  abstract setTemplateData(mailInfo: object): object;

  async sendMail(email: string, templateData: object): Promise<void> {
    await this.sendGridService.send({
      to: email,
      from: this.sender,
      dynamicTemplateData: templateData,
      templateId: this.emailTemplate,
    });
  }

  async execute(mailInfo: object): Promise<void> {
    console.log(mailInfo);
    const payload = await this.extractPayload(mailInfo);
    console.log(payload);

    mailInfo['returnLink'] = await this.prepareReturnLink(
      payload,
      mailInfo['returnLink'],
    );

    console.log(mailInfo);

    const templateData = this.setTemplateData(mailInfo);

    console.log(templateData);

    await this.sendMail(mailInfo['email'], templateData);
  }
}
