import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { IMailWithIdRequest } from './interfaces/mail-with-id-request.interface';
import { IBaseTokenRequest } from './interfaces/base/base.token-request.interface';
import { ILogin } from './interfaces/login.interface';
import { IAuthTokens } from './interfaces/auth-tokens.interface';
import {
  httponlyCookieOptions,
  openCookieOptions,
} from '../common/cookie.options';
import { Response as ResponseType } from 'express';
import { IAuthTokensAndId } from './interfaces/auth-tokens-and-id.interface';
import { IUser } from '../user/interfaces/user.interface';
import { UserService } from '../user/user.service';
import { IMailWithEmailRequest } from './interfaces/mail-with-email-request.interface';
import { IResetPasswordRequest } from './interfaces/reset-password-request.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    private readonly userService: UserService,
  ) {}

  async userSendVerifyEmail(userSendEmail: IMailWithIdRequest): Promise<void> {
    await lastValueFrom(
      this.authClient.send({ cmd: 'sendUserVerifyEmail' }, userSendEmail).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }

  async userSendResetPsw(userSendEmail: IMailWithEmailRequest): Promise<void> {
    await lastValueFrom(
      this.authClient.send({ cmd: 'sendUserResetPsw' }, userSendEmail).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }

  async userValidateVerifyToken(userToken: IBaseTokenRequest): Promise<void> {
    await lastValueFrom(
      this.authClient.send({ cmd: 'validateUserVerifyToken' }, userToken).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }
  async userValidateResetPswToken(tokenAndPsw: IResetPasswordRequest) {
    await lastValueFrom(
      this.authClient
        .send({ cmd: 'validateUserResetPswToken' }, tokenAndPsw)
        .pipe(
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

  async login(login: ILogin, res: ResponseType): Promise<IUser> {
    const { id, authTokens }: IAuthTokensAndId = await lastValueFrom(
      this.authClient.send<IAuthTokensAndId>({ cmd: 'login' }, login).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );

    await this.setAuthCookies(authTokens, res);

    return await this.userService.getUserById(id);
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
    oldAuthTokens: IAuthTokens,
    res: ResponseType,
  ): Promise<IUser> {
    const { id, authTokens }: IAuthTokensAndId = await lastValueFrom(
      this.authClient
        .send<IAuthTokensAndId>({ cmd: 'refreshTokens' }, oldAuthTokens)
        .pipe(
          catchError((val) => {
            throw new RpcException(val);
          }),
        ),
    );

    await this.clearAuthCookies(res);
    await this.setAuthCookies(authTokens, res);

    return await this.userService.getUserById(id);
  }
}
