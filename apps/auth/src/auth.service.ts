import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { IUser } from './interfaces/user.interface';
import { MailerAuthService } from './mailer/mailer.auth.service';
import { UserVerificationMailDto } from './mailer/dto/user-verification.mail.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    private readonly mailerAuthService: MailerAuthService,
  ) {}

  async sendUserVerifyEmail(
    mailInfo: UserVerificationMailDto,
  ): Promise<boolean> {
    const user: IUser = await this.getUserById(mailInfo.id);

    if (user.verified) return false;
    mailInfo.email = user.email;

    await this.mailerAuthService.userEmailVerification(mailInfo);

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
