import { Inject, Injectable } from '@nestjs/common';
import { ITokenAndId } from './interfaces/token-and-id.interface';
import { catchError, lastValueFrom } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { IAuthTokens } from './interfaces/auth-tokens.interface';
import { IPayloadAndId } from './interfaces/payload-and-id.interface';
import { IId } from './interfaces/id.interface';

@Injectable()
export class TokenAuthService {
  constructor(
    @Inject('TOKEN_SERVICE') private readonly tokenClient: ClientProxy,
  ) {}

  async verifyVerifyTokenAndClear(userToken: ITokenAndId): Promise<boolean> {
    return await lastValueFrom(
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

  async removeAuthTokens(authTokens: IAuthTokens): Promise<void> {
    const { accessToken, refreshToken } = authTokens;

    try {
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
          .send<boolean>(
            { role: 'user', token: 'access', cmd: 'verifyAndRemove' },
            { token: accessToken, id } as ITokenAndId,
          )
          .pipe(
            catchError((val) => {
              // TODO: Log error
              throw new RpcException(val);
            }),
          ),
      );
      await lastValueFrom(
        this.tokenClient
          .send<boolean>(
            { role: 'user', token: 'refresh', cmd: 'verifyAndRemove' },
            { token: refreshToken, id } as ITokenAndId,
          )
          .pipe(
            catchError((val) => {
              // TODO: Log error
              throw new RpcException(val);
            }),
          ),
      );
    } catch (err) {}
  }
}
