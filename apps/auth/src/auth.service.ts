import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { IUser } from './interfaces/user.interface';
import { MailerAuthService } from './mailer/mailer.auth.service';
import { IBaseUserMail } from './mailer/interfaces/base.user.mail.interface';
import { IVerificationUserMail } from './mailer/interfaces/verification.user.mail.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    private readonly mailerAuthService: MailerAuthService,
  ) {}

  async sendUserVerifyEmail(baseMailInfo: IBaseUserMail): Promise<boolean> {
    const user: IUser = await this.getUserById(baseMailInfo.id);

    if (user.verified) return false;

    const fullMailInfo: IVerificationUserMail = {
      ...baseMailInfo,
      email: user.email,
    };

    await this.mailerAuthService.userEmailVerification(fullMailInfo);

    return true;
  }

  async getUserById(id: number) {
    return await lastValueFrom(
      this.userClient.send<IUser>({ cmd: 'getUserById' }, id).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }
}
