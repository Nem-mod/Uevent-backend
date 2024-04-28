import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-cookie';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { IUser } from '../../user/interfaces/user.interface';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refreshJwt') {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {
    super({
      cookieName: 'refreshToken',
    });
  }

  async validate(token: string): Promise<IUser> {
    const id = await lastValueFrom(
      this.authClient.send<number>({ cmd: 'validateRefreshToken' }, token).pipe(
        catchError(() => {
          throw new UnauthorizedException('Refresh token is invalid');
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
