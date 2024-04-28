import { Inject, Injectable } from '@nestjs/common';
import { ITokenAndId } from './interfaces/token-and-id.interface';
import { catchError, lastValueFrom } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { IAuthTokens } from './interfaces/auth-tokens.interface';
import { IPayloadAndId } from './interfaces/payload-and-id';
import { IId } from './interfaces/id.interface';
import { IAuthTokensAndId } from './interfaces/auth-tokens-and-id.interface';

@Injectable()
export class TokenAuthService {
  constructor(
    @Inject('TOKEN_SERVICE') private readonly tokenClient: ClientProxy,
  ) {}

  async verifyVerifyTokenAndClear(userToken: ITokenAndId): Promise<void> {
    await lastValueFrom(
      this.tokenClient
        .send<boolean>(
          { role: 'user', token: 'verify', cmd: 'verifyAndClear' },
          userToken,
        )
        .pipe(
          catchError((val) => {
            throw new RpcException(val);
          }),
        ),
    );
  }

  async signAuthTokensAndPush(id: number): Promise<IAuthTokens> {
    const payloadAndId: IPayloadAndId = {
      payload: { id },
      id,
    };
    const accessToken = await lastValueFrom(
      this.tokenClient
        .send<string>(
          { role: 'user', token: 'access', cmd: 'signAndPush' },
          payloadAndId,
        )
        .pipe(
          catchError((val) => {
            throw new RpcException(val);
          }),
        ),
    );
    const refreshToken = await lastValueFrom(
      this.tokenClient
        .send<string>(
          { role: 'user', token: 'refresh', cmd: 'signAndPush' },
          payloadAndId,
        )
        .pipe(
          catchError((val) => {
            throw new RpcException(val);
          }),
        ),
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async removeAuthTokens(authTokens: IAuthTokens): Promise<number> {
    const { accessToken, refreshToken } = authTokens;
    const { id }: IId = await lastValueFrom(
      this.tokenClient
        .send<IId>(
          { role: 'user', token: 'access', cmd: 'decode' },
          accessToken,
        )
        .pipe(
          catchError((val) => {
            throw new RpcException(val);
          }),
        ),
    );

    try {
      await lastValueFrom(
        this.tokenClient
          .send<boolean>({ role: 'user', token: 'access', cmd: 'remove' }, {
            token: accessToken,
            id,
          } as ITokenAndId)
          .pipe(
            catchError(() => {
              // TODO: Log error
              return null;
              // throw new RpcException(val);
            }),
          ),
      );
      await lastValueFrom(
        this.tokenClient
          .send<boolean>({ role: 'user', token: 'refresh', cmd: 'remove' }, {
            token: refreshToken,
            id,
          } as ITokenAndId)
          .pipe(
            catchError(() => {
              // TODO: Log error
              return null;
              // throw new RpcException(val);
            }),
          ),
      );
    } catch (err) {}

    return id;
  }

  async validateAccessToken(accessToken: string): Promise<number> {
    const { id }: IId = await lastValueFrom(
      this.tokenClient
        .send<IId>(
          { role: 'user', token: 'access', cmd: 'decode' },
          accessToken,
        )
        .pipe(
          catchError((val) => {
            throw new RpcException(val);
          }),
        ),
    );

    await lastValueFrom(
      this.tokenClient
        .send<boolean>({ role: 'user', token: 'access', cmd: 'verify' }, {
          token: accessToken,
          id,
        } as ITokenAndId)
        .pipe(
          catchError((val) => {
            throw new RpcException(val);
          }),
        ),
    );

    return id;
  }

  async validateRefreshToken(refreshToken: string): Promise<number> {
    const { id }: IId = await lastValueFrom(
      this.tokenClient
        .send<IId>(
          { role: 'user', token: 'refresh', cmd: 'decode' },
          refreshToken,
        )
        .pipe(
          catchError((val) => {
            throw new RpcException(val);
          }),
        ),
    );

    await lastValueFrom(
      this.tokenClient
        .send<boolean>({ role: 'user', token: 'refresh', cmd: 'verify' }, {
          token: refreshToken,
          id,
        } as ITokenAndId)
        .pipe(
          catchError((val) => {
            throw new RpcException(val);
          }),
        ),
    );

    return id;
  }

  async refreshAuthTokens(authTokens: IAuthTokens): Promise<IAuthTokensAndId> {
    const id: number = await this.removeAuthTokens(authTokens);

    const newAuthTokens: IAuthTokens = await this.signAuthTokensAndPush(id);

    return { authTokens: newAuthTokens, id };
  }
}
