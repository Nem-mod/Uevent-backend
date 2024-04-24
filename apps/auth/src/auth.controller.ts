import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { UserVerificationMailDto } from './mailer/dto/user-verification.mail.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'sendUserVerifyEmail' })
  async sendUserVerifyEmail(mailInfo: UserVerificationMailDto) {
    console.log(mailInfo);
    return await this.authService.sendUserVerifyEmail(mailInfo);
  }
}
