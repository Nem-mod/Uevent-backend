import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGatewayService } from './auth.gateway.service';
import { IReturnLink } from './interfaces/return-link.interface';
import { IBaseUserMail } from './interfaces/base/base.user.mail.interface';
import { IToken } from './interfaces/token.interface';
import { IBaseUserToken } from './interfaces/base/base.user.token.interface';
import { ILogin } from './interfaces/login.interface';
import { IFullUserGateway } from '../user/interfaces/full-user.gateway.interface';
import { Request as RequestType, Response as ResponseType } from 'express';
import { IAuthTokens } from './interfaces/auth-tokens.interface';
import { RefreshJwtAuthGuard } from '../gateway/guards/refresh-jwt-auth.guard';

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

  @Post('user/login')
  async login(
    @Body() login: ILogin,
    @Res({ passthrough: true }) res: ResponseType,
  ): Promise<IFullUserGateway> {
    return await this.authGatewayService.login(login, res);
  }

  @Delete('user/logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(
    @Req() req: RequestType,
    @Res({ passthrough: true }) res: ResponseType,
  ): Promise<void> {
    const authTokens: IAuthTokens = {
      refreshToken: req.cookies.refreshToken,
      accessToken: req.cookies.accessToken,
    };
    await this.authGatewayService.logout(authTokens, res);
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('user/refresh')
  async refreshToken(
    @Req() req: RequestType,
    @Res({ passthrough: true }) res: ResponseType,
  ): Promise<IFullUserGateway> {
    const authTokens: IAuthTokens = {
      refreshToken: req.cookies.refreshToken,
      accessToken: req.cookies.accessToken,
    };

    return await this.authGatewayService.refreshTokens(authTokens, res);
  }
}
