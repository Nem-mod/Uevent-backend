import { ConfigService } from '@nestjs/config';
import { SendGridService } from '@anchan828/nest-sendgrid';

export abstract class BaseMailType {
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

  abstract extractPayload(mailInfo: object): object;

  abstract generateJwt(payload: object): string;

  protected async prepareReturnLink(
    payload: object,
    returnLink: string,
  ): Promise<string> {
    const token = this.generateJwt(payload); // TODO: Change to jwt service call
    returnLink = returnLink.replace(this.replaceWord, token);
    return returnLink;
  }

  abstract setTemplateData(mailInfo: object): object;

  protected async sendMail(email: string, templateData: object): Promise<void> {
    await this.sendGridService.send({
      to: email,
      from: this.sender,
      dynamicTemplateData: templateData,
      templateId: this.emailTemplate,
    });
  }

  protected async execute(mailInfo: object): Promise<void> {
    const payload = this.extractPayload(mailInfo);

    mailInfo['returnUrl'] = await this.prepareReturnLink(
      payload,
      mailInfo['returnUrl'],
    );

    const templateData = this.setTemplateData(mailInfo);

    await this.sendMail(mailInfo['email'], templateData);
  }
}
