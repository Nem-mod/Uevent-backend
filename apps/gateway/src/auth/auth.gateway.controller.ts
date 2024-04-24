import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AuthGatewayService } from './auth.gateway.service';
import { IReturnLink } from './interfaces/return-link.interface';
import { IBaseUserMail } from './interfaces/base.user.mail.interface';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthGatewayController {
  constructor(private readonly authGatewayService: AuthGatewayService) {}

  @Post('user/:id/send/verify')
  async userSendVerifyEmail(
    @Param('id', ParseIntPipe) userId: number,
    @Body() returnLink: IReturnLink,
  ) {
    const userSendEmail: IBaseUserMail = {
      id: userId,
      returnLink: returnLink.returnLink,
    };
    return await this.authGatewayService.userSendVerifyEmail(userSendEmail);
  }
}
