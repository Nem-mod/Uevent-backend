import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthGatewayService } from './auth.gateway.service';
import { IReturnLink } from './interfaces/return-link.interface';
import { IBaseUserMail } from './interfaces/base/base.user.mail.interface';
import { IToken } from './interfaces/token.interface';
import { IBaseUserToken } from './interfaces/base/base.user.token.interface';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthGatewayController {
  constructor(private readonly authGatewayService: AuthGatewayService) {}

  @Post('user/:id/send/verify')
  @HttpCode(HttpStatus.NO_CONTENT)
  async userSendVerifyEmail(
    @Param('id', ParseIntPipe) id: number,
    @Body() returnLink: IReturnLink,
  ): Promise<boolean> {
    const userSendEmail: IBaseUserMail = {
      id,
      returnLink: returnLink.returnLink,
    };
    return await this.authGatewayService.userSendVerifyEmail(userSendEmail);
  }

  @Patch(`user/:id/validate/verify`)
  @HttpCode(HttpStatus.NO_CONTENT)
  async userValidateVerifyToken(
    @Param('id', ParseIntPipe) id: number,
    @Body() token: IToken,
  ): Promise<boolean> {
    const userToken: IBaseUserToken = {
      id,
      token: token.token,
    };
    return await this.authGatewayService.userValidateVerifyToken(userToken);
  }
}
