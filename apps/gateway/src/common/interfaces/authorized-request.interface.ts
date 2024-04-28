import { IUser } from '../../user/interfaces/user.interface';
import { Request as RequestType } from 'express';

export interface IAuthorizedRequest extends RequestType {
  user?: IUser;
}
