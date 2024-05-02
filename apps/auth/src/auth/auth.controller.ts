import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { IBaseUserMail } from '../mailer/interfaces/base.user.mail.interface';
import { ITokenAndId } from '../token/interfaces/token-and-id.interface';
import { ILogin } from '../user/interfaces/login.interface';
import { IAuthTokens } from '../token/interfaces/auth-tokens.interface';
import { IAuthTokensAndId } from '../token/interfaces/auth-tokens-and-id.interface';
import { ITokenAndPassword } from '../token/interfaces/token-and-password.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'sendUserVerifyEmail' })
  async sendUserVerifyEmail(baseMailInfo: IBaseUserMail): Promise<true> {
    await this.authService.sendUserVerifyEmail(baseMailInfo);
    return true;
  }

  @MessagePattern({ cmd: 'sendUserResetPsw' })
  async sendUserResetPswEmail(baseMailInfo: IBaseUserMail): Promise<true> {
    await this.authService.sendUserResetPsw(baseMailInfo);
    return true;
  }

  @MessagePattern({ cmd: 'validateUserVerifyToken' })
  async validateUserVerifyToken(userToken: ITokenAndId): Promise<true> {
    await this.authService.validateUserVerifyToken(userToken);
    return true;
  }

  @MessagePattern({ cmd: 'validateUserResetPswToken' })
  async validateUserResetPswToken(pswToken: ITokenAndPassword): Promise<true> {
    await this.authService.validateUserResetPswToken(pswToken);
    return true;
  }

  @MessagePattern({ cmd: 'login' })
  async login(login: ILogin): Promise<IAuthTokensAndId> {
    return await this.authService.login(login);
  }

  @EventPattern('logout')
  async logout(authTokens: IAuthTokens): Promise<void> {
    await this.authService.logout(authTokens);
  }

  @MessagePattern({ cmd: 'validateAccessToken' })
  async validateAccessToken(accessToken: string): Promise<number> {
    return await this.authService.validateAccessToken(accessToken);
  }

  @MessagePattern({ cmd: 'validateRefreshToken' })
  async validateRefreshToken(refreshToken: string): Promise<number> {
    return await this.authService.validateRefreshToken(refreshToken);
  }

  @MessagePattern({ cmd: 'refreshTokens' })
  async refreshAuthTokens(authTokens: IAuthTokens): Promise<IAuthTokensAndId> {
    return await this.authService.refreshAuthTokens(authTokens);
  }
}
