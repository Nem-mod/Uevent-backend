import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { IBaseUserMail } from './mailer/interfaces/base.user.mail.interface';
import { ITokenAndId } from './token/interfaces/token-and-id.interface';
import { ILogin } from './user/interfaces/login.interface';
import { IUserAndAuthTokens } from './interfaces/user-and-auth-tokens.interface';
import { IAuthTokens } from './token/interfaces/auth-tokens.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'sendUserVerifyEmail' })
  async sendUserVerifyEmail(baseMailInfo: IBaseUserMail): Promise<boolean> {
    await this.authService.sendUserVerifyEmail(baseMailInfo);
    return true;
  }

  @MessagePattern({ cmd: 'validateUserVerifyToken' })
  async validateUserVerifyToken(userToken: ITokenAndId): Promise<boolean> {
    return await this.authService.validateUserVerifyToken(userToken);
  }

  @MessagePattern({ cmd: 'login' })
  async login(login: ILogin): Promise<IUserAndAuthTokens> {
    return await this.authService.login(login);
  }

  @EventPattern('logout')
  async logout(authTokens: IAuthTokens) {
    await this.authService.logout(authTokens);
  }
}
