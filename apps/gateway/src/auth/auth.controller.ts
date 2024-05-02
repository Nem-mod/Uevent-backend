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
import { AuthService } from './auth.service';
import { IMailWithIdRequest } from './interfaces/mail-with-id-request.interface';
import { IBaseTokenRequest } from './interfaces/base/base.token-request.interface';
import { ILogin } from './interfaces/login.interface';
import { Response as ResponseType } from 'express';
import { IAuthTokens } from './interfaces/auth-tokens.interface';
import { IUser } from '../user/interfaces/user.interface';
import { IAuthorizedRequest } from '../common/interfaces/authorized-request.interface';
import { RefreshAuthGuard } from '../common/guards/refresh-auth.guard';
import { IReturnLink } from './interfaces/return-link.interface';
import { IReturnLinkAndEmail } from './interfaces/return-link-and-email.interface';
import { IMailWithEmailRequest } from './interfaces/mail-with-email-request.interface';
import { IResetPasswordRequest } from './interfaces/reset-password-request.interface';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authGatewayService: AuthService) {}

  @Post('user/:id/send/verify')
  @HttpCode(HttpStatus.NO_CONTENT)
  async userSendVerifyEmail(
    @Param('id', ParseIntPipe) id: number,
    @Body() returnLink: IReturnLink,
  ): Promise<void> {
    const userSendEmail: IMailWithIdRequest = {
      id,
      returnLink: returnLink.returnLink,
    };
    await this.authGatewayService.userSendVerifyEmail(userSendEmail);
  }

  @Post('user/send/reset-psw')
  @HttpCode(HttpStatus.NO_CONTENT)
  async userSendResetPsw(
    @Body() returnLinkAndEmail: IReturnLinkAndEmail,
  ): Promise<void> {
    const userSendEmail: IMailWithEmailRequest = {
      email: returnLinkAndEmail.email,
      returnLink: returnLinkAndEmail.returnLink,
    };
    await this.authGatewayService.userSendResetPsw(userSendEmail);
  }

  @Patch(`user/:id/validate/verify`)
  @HttpCode(HttpStatus.NO_CONTENT)
  async userValidateVerifyToken(
    @Param('id', ParseIntPipe) id: number,
    @Body() token: string,
  ): Promise<void> {
    const userToken: IBaseTokenRequest = {
      id,
      token,
    };
    await this.authGatewayService.userValidateVerifyToken(userToken);
  }

  @Patch(`user/validate/reset-psw`)
  @HttpCode(HttpStatus.NO_CONTENT)
  async userValidateResetPswToken(
    @Req() req: IAuthorizedRequest,
    @Body() tokenAndPsw: IResetPasswordRequest,
    @Res({ passthrough: true }) res: ResponseType,
  ): Promise<void> {
    // const authTokens: IAuthTokens = {
    //   refreshToken: req.cookies.refreshToken,
    //   accessToken: req.cookies.accessToken,
    // };
    await this.authGatewayService.userValidateResetPswToken(tokenAndPsw);
    // await this.authGatewayService.logout(authTokens, res);
  }

  @Post('user/login')
  async login(
    @Body() login: ILogin,
    @Res({ passthrough: true }) res: ResponseType,
  ): Promise<IUser> {
    return await this.authGatewayService.login(login, res);
  }

  @Delete('user/logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(
    @Req() req: IAuthorizedRequest,
    @Res({ passthrough: true }) res: ResponseType,
  ): Promise<void> {
    const authTokens: IAuthTokens = {
      refreshToken: req.cookies.refreshToken,
      accessToken: req.cookies.accessToken,
    };
    await this.authGatewayService.logout(authTokens, res);
  }

  @UseGuards(RefreshAuthGuard)
  @Post('user/refresh')
  async refreshToken(
    @Req() req: IAuthorizedRequest,
    @Res({ passthrough: true }) res: ResponseType,
  ): Promise<IUser> {
    const authTokens: IAuthTokens = {
      refreshToken: req.cookies.refreshToken,
      accessToken: req.cookies.accessToken,
    };

    return await this.authGatewayService.refreshTokens(authTokens, res);
  }
}
