import { IAuthTokens } from './auth-tokens.interface';
import { IId } from './id.interface';

export interface IAuthTokensAndId extends IId {
  authTokens: IAuthTokens;
}
