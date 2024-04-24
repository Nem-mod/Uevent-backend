import { IBaseUserMail } from './base.user.mail.interface';

export interface IVerificationUserMail extends IBaseUserMail {
  email: string;
}
