import { IUser } from '../../user/interfaces/user.interface';
import { IAuthTokens } from '../../token/interfaces/auth-tokens.interface';

export interface IUserAndAuthTokens {
  user: IUser;
  authTokens: IAuthTokens;
}
