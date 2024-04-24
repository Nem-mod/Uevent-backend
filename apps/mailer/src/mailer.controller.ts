import { Controller } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MessagePattern } from '@nestjs/microservices';
import { UserVerificationMailDto } from './dto/user-verification/user-verification.mail.dto';

@Controller()
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @MessagePattern({ role: 'user', mail: 'verification', cmd: 'send' })
  async sendUserVerificationEmail(
    mailInfo: UserVerificationMailDto,
  ): Promise<boolean> {
    await this.mailerService.userEmailVerification(mailInfo);
    return true;
  }
}
