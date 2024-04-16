import { Injectable } from '@nestjs/common';

@Injectable()
export class PositionsService {
  getHello(): string {
    return 'Hello World!';
  }
}
