import { Injectable } from '@nestjs/common';

@Injectable()
export class PositionService {
  getHello(): string {
    return 'Hello World!';
  }
}
