import { Injectable } from '@nestjs/common';

@Injectable()
export class OrganizationsService {
  getHello(): string {
    return 'Hello World!';
  }
}
