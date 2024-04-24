import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { IBaseUserMail } from './mailer/interfaces/base.user.mail.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'sendUserVerifyEmail' })
  async sendUserVerifyEmail(baseMailInfo: IBaseUserMail) {
    return await this.authService.sendUserVerifyEmail(baseMailInfo);
  }
}
