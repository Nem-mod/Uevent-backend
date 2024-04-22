import { Controller } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { EventPattern } from '@nestjs/microservices';
import { UserVerificationMailDto } from './dto/user-verification/user-verification.mail.dto';

@Controller()
export class MailerController {
  // TODO: Maybe create user and org dtos for specify emails
  constructor(private readonly mailerService: MailerService) {}

  @EventPattern('user.verification')
  async sendUserVerificationEmail(mailInfo: UserVerificationMailDto) {
    await this.mailerService.userEmailVerification(mailInfo);
  }
}
