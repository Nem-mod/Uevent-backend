import { ForbiddenException, Injectable } from '@nestjs/common';
import { IUser } from '../user/interfaces/user.interface';
import { MailerAuthService } from '../mailer/mailer.auth.service';
import { IBaseUserMail } from '../mailer/interfaces/base.user.mail.interface';
import { IVerificationUserMail } from '../mailer/interfaces/verification.user.mail.interface';
import { ITokenAndId } from '../token/interfaces/token-and-id.interface';
import { TokenService } from '../token/token.service';
import { UserAuthService } from '../user/user.auth.service';
import { ILogin } from '../user/interfaces/login.interface';
import { IAuthTokens } from '../token/interfaces/auth-tokens.interface';
import { IAuthTokensAndId } from '../token/interfaces/auth-tokens-and-id.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly mailerAuthService: MailerAuthService,
    private readonly tokenAuthService: TokenService,
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

  async validateUserVerifyToken(userToken: ITokenAndId): Promise<void> {
    await this.tokenAuthService.verifyVerifyTokenAndClear(userToken);

    await this.userAuthService.setUserVerified(userToken.id);
  }

  async validateAccessToken(accessToken: string): Promise<number> {
    return await this.tokenAuthService.validateAccessToken(accessToken);
  }

  async validateRefreshToken(refreshToken: string): Promise<number> {
    return await this.tokenAuthService.validateRefreshToken(refreshToken);
  }

  async login(login: ILogin): Promise<IAuthTokensAndId> {
    const user: IUser = await this.userAuthService.verifyUser(login);

    if (!user.verified) throw new ForbiddenException('User is not verified');

    const authTokens: IAuthTokens =
      await this.tokenAuthService.signAuthTokensAndPush(user.id);

    return { id: user.id, authTokens };
  }

  async logout(authTokens: IAuthTokens): Promise<void> {
    await this.tokenAuthService.removeAuthTokens(authTokens);
  }

  async refreshAuthTokens(authTokens: IAuthTokens): Promise<IAuthTokensAndId> {
    return await this.tokenAuthService.refreshAuthTokens(authTokens);
  }
}
