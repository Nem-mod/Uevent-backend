import { HttpException } from '@nestjs/common';

export interface IBaseExceptionHandler {
  handle(exception: any): HttpException;
}
