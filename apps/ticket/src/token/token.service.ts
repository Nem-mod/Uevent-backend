import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { ITokenVerifyResponse } from './interfaces/token-verify-response.interface';
import { ITokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class TokenService {
  constructor(
    @Inject('TOKEN_SERVICE') private readonly tokenClient: ClientProxy,
  ) {}

  async signToken(ticketId: number): Promise<string> {
    const payload: ITokenPayload = {
      id: ticketId,
    };

    return await lastValueFrom(
      this.tokenClient
        .send<string>({ role: 'ticket', token: 'scan', cmd: 'sign' }, payload)
        .pipe(
          catchError((val) => {
            throw new RpcException(val);
          }),
        ),
    );
  }

  async verifyToken(token: string): Promise<ITokenVerifyResponse> {
    return await lastValueFrom(
      this.tokenClient
        .send<ITokenVerifyResponse>(
          { role: 'ticket', token: 'scan', cmd: 'simpleVerify' },
          token,
        )
        .pipe(
          catchError((val) => {
            throw new RpcException(val);
          }),
        ),
    );
  }
}
