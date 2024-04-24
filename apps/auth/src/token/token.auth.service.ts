import { Inject, Injectable } from '@nestjs/common';
import { ITokenAndUserId } from './interfaces/token-and-user-id.token.interface';
import { catchError, lastValueFrom } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';

@Injectable()
export class TokenAuthService {
  constructor(
    @Inject('TOKEN_SERVICE') private readonly tokenClient: ClientProxy,
  ) {}

  async verifyAndClear(userToken: ITokenAndUserId): Promise<boolean> {
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
}
