import { Inject, Injectable } from '@nestjs/common';
import { ITokenAndUserId } from './interfaces/token-and-user-id.interface';
import { catchError, lastValueFrom } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { IAuthTokens } from './interfaces/auth-tokens.interface';
import { IPayloadAndId } from './interfaces/payload-and-id.interface';

@Injectable()
export class TokenAuthService {
  constructor(
    @Inject('TOKEN_SERVICE') private readonly tokenClient: ClientProxy,
  ) {}

  async verifyVerifyTokenAndClear(
    userToken: ITokenAndUserId,
  ): Promise<boolean> {
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

    console.log({
      accessToken,
      refreshToken,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
