import { Request as RequestType } from 'express';

export interface ILogin {
  req: RequestType;
  email: string;
  password: string;
}
