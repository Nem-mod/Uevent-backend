import { HttpStatus } from '@nestjs/common';

export interface IRpcException {
  code: HttpStatus;
  message: string;
}
