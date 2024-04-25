import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { IBaseUserMail } from './mailer/interfaces/base.user.mail.interface';
import { ITokenAndUserId } from './token/interfaces/token-and-user-id.interface';
import { ILogin } from './user/interfaces/login.interface';
import { IUserAndAuthTokens } from './interfaces/user-and-auth-tokens.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'sendUserVerifyEmail' })
  async sendUserVerifyEmail(baseMailInfo: IBaseUserMail): Promise<boolean> {
    await this.authService.sendUserVerifyEmail(baseMailInfo);
    return true;
  }

  @MessagePattern({ cmd: 'validateUserVerifyToken' })
  async validateUserVerifyToken(userToken: ITokenAndUserId): Promise<boolean> {
    return await this.authService.validateUserVerifyToken(userToken);
  }

  @MessagePattern({ cmd: 'login' })
  async login(login: ILogin): Promise<IUserAndAuthTokens> {
    return await this.authService.login(login);
  }
}
