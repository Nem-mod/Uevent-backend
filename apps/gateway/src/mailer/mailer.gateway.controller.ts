import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserVerificationMailDto } from './dto/user-verification.mail.dto';
import { MailerGatewayService } from './mailer.gateway.service';

@Controller({
  version: '1',
  path: 'mailer',
})
export class MailerGatewayController {
  constructor(private readonly mailerGatewayService: MailerGatewayService) {}

  @Post('user/:id/verification')
  async sendUserVerificationEmail(
    @Param('id', ParseIntPipe) userId: number,
    @Body() mailInfo: UserVerificationMailDto,
  ) {
    mailInfo = { ...mailInfo, userId };
    await this.mailerGatewayService.userEmailVerification(mailInfo);
  }
}
