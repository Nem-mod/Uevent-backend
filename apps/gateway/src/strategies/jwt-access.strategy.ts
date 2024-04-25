import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-cookie';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { IFullUserGateway } from '../user/interfaces/full-user.gateway.interface';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'accessJwt') {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {
    super({
      cookieName: 'accessToken',
    });
  }

  async validate(token: string): Promise<IFullUserGateway> {
    return await lastValueFrom(
      this.authClient
        .send<IFullUserGateway>({ cmd: 'validateAccessToken' }, token)
        .pipe(
          catchError(() => {
            throw new UnauthorizedException('Access token is invalid');
          }),
        ),
    );
  }
}
