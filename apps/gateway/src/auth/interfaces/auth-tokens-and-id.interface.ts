import { IAuthTokens } from './auth-tokens.interface';

export interface IAuthTokensAndId {
  id: number;
  authTokens: IAuthTokens;
}
