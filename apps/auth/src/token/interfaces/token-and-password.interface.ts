import { IPassword } from '../../user/interfaces/password.interface';

export interface ITokenAndPassword extends IPassword {
  token: string;
}
