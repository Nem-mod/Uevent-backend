import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { ILogin } from '../../auth/interfaces/login.interface';
import { IUser } from '../../user/interfaces/user.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<IUser> {
    const login: ILogin = { email, password };
    return await lastValueFrom(
      this.authClient.send<IUser>({ cmd: 'login' }, login).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }
}
