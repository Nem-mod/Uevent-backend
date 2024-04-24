import { IToken } from '../token.interface';
import { IUserId } from '../user-id.interface';

export interface IBaseUserToken extends IUserId, IToken {}
