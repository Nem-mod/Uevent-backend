import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-cookie';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { IUser } from '../../user/interfaces/user.interface';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'accessJwt') {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {
    super({
      cookieName: 'accessToken',
    });
  }

  async validate(token: string): Promise<IUser> {
    const id = await lastValueFrom(
      this.authClient.send<number>({ cmd: 'validateAccessToken' }, token).pipe(
        catchError(() => {
          throw new UnauthorizedException('Access token is invalid');
        }),
      ),
    );

    return await lastValueFrom(
      this.userClient.send<IUser>({ cmd: 'getUserById' }, id).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }
}
