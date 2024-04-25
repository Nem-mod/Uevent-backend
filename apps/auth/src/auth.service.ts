import { ForbiddenException, Injectable } from '@nestjs/common';
import { IUser } from './user/interfaces/user.interface';
import { MailerAuthService } from './mailer/mailer.auth.service';
import { IBaseUserMail } from './mailer/interfaces/base.user.mail.interface';
import { IVerificationUserMail } from './mailer/interfaces/verification.user.mail.interface';
import { ITokenAndUserId } from './token/interfaces/token-and-id.interface';
import { TokenAuthService } from './token/token.auth.service';
import { UserAuthService } from './user/user.auth.service';
import { ILogin } from './user/interfaces/login.interface';
import { IAuthTokens } from './token/interfaces/auth-tokens.interface';
import { IUserAndAuthTokens } from './interfaces/user-and-auth-tokens.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly mailerAuthService: MailerAuthService,
    private readonly tokenAuthService: TokenAuthService,
  ) {}

  async sendUserVerifyEmail(baseMailInfo: IBaseUserMail): Promise<void> {
    const user: IUser = await this.userAuthService.getUserById(baseMailInfo.id);

    if (user.verified) throw new ForbiddenException('User is already verified');

    const fullMailInfo: IVerificationUserMail = {
      ...baseMailInfo,
      email: user.email,
    };

    await this.mailerAuthService.userEmailVerification(fullMailInfo);
  }

  async validateUserVerifyToken(userToken: ITokenAndUserId): Promise<boolean> {
    if (!(await this.tokenAuthService.verifyVerifyTokenAndClear(userToken)))
      return false;

    await this.userAuthService.setUserVerified(userToken.id);
    return true;
  }

  async login(login: ILogin): Promise<IUserAndAuthTokens> {
    const user: IUser = await this.userAuthService.verifyUser(login);

    if (!user.verified) throw new ForbiddenException('User is not verified');

    console.log('here');
    const authTokens: IAuthTokens =
      await this.tokenAuthService.signAuthTokensAndPush(user.id);

    console.log(authTokens);

    return { user, authTokens };
  }

  async logout(authTokens: IAuthTokens) {
    await this.tokenAuthService.removeAuthTokens(authTokens);
  }
}
