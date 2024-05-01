import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ITicketReceiptMail } from './interfaces/ticket-receipt-mail.interface';

@Injectable()
export class MailerService {
  constructor(
    @Inject('MAILER_SERVICE') private readonly mailerClient: ClientProxy,
  ) {}

  async sendTicketReceiptEmail(mailInfo: ITicketReceiptMail): Promise<void> {
    this.mailerClient.emit(
      { role: 'ticket', mail: 'receipt', cmd: 'send' },
      mailInfo,
    );
  }
}
