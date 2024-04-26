import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { IBaseUserMail } from './interfaces/base/base.user.mail.interface';
import { IBaseUserToken } from './interfaces/base/base.user.token.interface';
import { ILogin } from './interfaces/login.interface';
import { IAuthTokens } from './interfaces/auth-tokens.interface';
import { IFullUserGateway } from '../user/interfaces/full-user.gateway.interface';
import { httponlyCookieOptions, openCookieOptions } from '../cookie.options';
import { Response as ResponseType } from 'express';
import { IFullUserGatewayAndAuthTokens } from './interfaces/full-user-gateway-and-auth-tokens.interface';

@Injectable()
export class AuthGatewayService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  async userSendVerifyEmail(userSendEmail: IBaseUserMail): Promise<boolean> {
    return await lastValueFrom(
      this.authClient.send({ cmd: 'sendUserVerifyEmail' }, userSendEmail).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }

  async userValidateVerifyToken(userToken: IBaseUserToken): Promise<boolean> {
    return await lastValueFrom(
      this.authClient.send({ cmd: 'validateUserVerifyToken' }, userToken).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }

  async setAuthCookies(
    authTokens: IAuthTokens,
    res: ResponseType,
  ): Promise<void> {
    res.cookie('accessToken', authTokens.accessToken, openCookieOptions);
    res.cookie('refreshToken', authTokens.refreshToken, httponlyCookieOptions);
  }

  async login(login: ILogin, res: ResponseType): Promise<IFullUserGateway> {
    const { user, authTokens } = await lastValueFrom(
      this.authClient
        .send<IFullUserGatewayAndAuthTokens>({ cmd: 'login' }, login)
        .pipe(
          catchError((val) => {
            throw new RpcException(val);
          }),
        ),
    );

    await this.setAuthCookies(authTokens, res);

    return user;
  }

  async clearAuthCookies(res: ResponseType): Promise<void> {
    res.clearCookie('accessToken', openCookieOptions);
    res.clearCookie('refreshToken', httponlyCookieOptions);
  }

  async logout(authTokens: IAuthTokens, res: ResponseType): Promise<void> {
    this.authClient.emit('logout', authTokens);

    await this.clearAuthCookies(res);
  }

  async refreshTokens(
    authTokens: IAuthTokens,
    res: ResponseType,
  ): Promise<IFullUserGateway> {
    const newAuthTokensAndUser: IFullUserGatewayAndAuthTokens =
      await lastValueFrom(
        this.authClient
          .send<IFullUserGatewayAndAuthTokens>(
            { cmd: 'refreshTokens' },
            authTokens,
          )
          .pipe(
            catchError((val) => {
              throw new RpcException(val);
            }),
          ),
      );

    await this.clearAuthCookies(res);
    await this.setAuthCookies(newAuthTokensAndUser.authTokens, res);

    return newAuthTokensAndUser.user;
  }
}
