import { Controller } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { UserVerificationMailDto } from './interfaces/dto/user-verification/user-verification.mail.dto';
import { TicketReceiptMailDto } from './interfaces/dto/ticket-receipt/ticket-receipt.mail.dto';

@Controller()
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @MessagePattern({ role: 'user', mail: 'verification', cmd: 'send' })
  async sendUserVerificationEmail(
    mailInfo: UserVerificationMailDto,
  ): Promise<true> {
    await this.mailerService.userEmailVerification(mailInfo);
    return true;
  }

  @EventPattern({ role: 'ticket', mail: 'receipt', cmd: 'send' })
  async sendTicketReceiptEmail(mailInfo: TicketReceiptMailDto): Promise<void> {
    await this.mailerService.ticketReceiptEmail(mailInfo);
  }
}
