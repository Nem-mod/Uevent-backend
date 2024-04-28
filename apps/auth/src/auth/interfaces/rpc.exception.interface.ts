import { HttpStatus } from '@nestjs/common';

export interface IRpcException {
  response: string | object;
  status: HttpStatus;
  options?: object;
}
