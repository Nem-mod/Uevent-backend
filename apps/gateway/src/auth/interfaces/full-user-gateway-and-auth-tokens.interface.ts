import { IFullUserGateway } from '../../user/interfaces/full-user.gateway.interface';
import { IAuthTokens } from './auth-tokens.interface';

export interface IFullUserGatewayAndAuthTokens {
  user: IFullUserGateway;
  authTokens: IAuthTokens;
}
