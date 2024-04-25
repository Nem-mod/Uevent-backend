import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { IFullUserGateway } from '../user/interfaces/full-user.gateway.interface';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { ILogin } from '../auth/interfaces/login.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<IFullUserGateway> {
    // TODO: create guard and use it authGateway
    const login: ILogin = { email, password };
    return await lastValueFrom(
      this.authClient.send({ cmd: 'login' }, login).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }
}
