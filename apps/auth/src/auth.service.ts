import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { IUser } from './interfaces/user.interface';
import { MailerAuthService } from './mailer/mailer.auth.service';
import { IBaseUserMail } from './mailer/interfaces/base.user.mail.interface';
import { IVerificationUserMail } from './mailer/interfaces/verification.user.mail.interface';
import { ITokenAndUserId } from './token/interfaces/token-and-user-id.token.interface';
import { TokenAuthService } from './token/token.auth.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    private readonly mailerAuthService: MailerAuthService,
    private readonly tokenAuthService: TokenAuthService,
  ) {}

  async sendUserVerifyEmail(baseMailInfo: IBaseUserMail): Promise<void> {
    const user: IUser = await this.getUserById(baseMailInfo.id);

    if (user.verified) throw new ForbiddenException('User is already verified');

    const fullMailInfo: IVerificationUserMail = {
      ...baseMailInfo,
      email: user.email,
    };

    await this.mailerAuthService.userEmailVerification(fullMailInfo);
  }

  async validateUserVerifyToken(userToken: ITokenAndUserId): Promise<boolean> {
    if (!(await this.tokenAuthService.verifyAndClear(userToken))) return false;

    await this.setUserVerified(userToken.id);
    return true;
  }

  async getUserById(id: number): Promise<IUser> {
    return await lastValueFrom(
      this.userClient.send<IUser>({ cmd: 'getUserById' }, id).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }

  async setUserVerified(id: number): Promise<void> {
    this.userClient.emit<IUser>('setVerifyUser', id);
  }
}
