import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AuthGatewayService } from './auth.gateway.service';
import { ReturnUrlDto } from './dto/return-url.dto';
import { UserSendEmailDto } from './dto/user.send-email.dto';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthGatewayController {
  constructor(private readonly authGatewayService: AuthGatewayService) {}

  @Post('user/:id/send/verify')
  async userSendVerifyEmail(
    @Param('id', ParseIntPipe) userId: number,
    @Body() returnLink: ReturnUrlDto,
  ) {
    const userSendEmail: UserSendEmailDto = {
      id: userId,
      returnUrl: returnLink.returnUrl,
    };
    console.log(userSendEmail);
    return await this.authGatewayService.userSendVerifyEmail(userSendEmail);
  }
}
