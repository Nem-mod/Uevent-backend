import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'redis-om';

@Injectable()
export class TokenService {
  constructor(
    @Inject('test-schema') private readonly testRepository: Repository,
  ) {}

  async test() {
    return await this.testRepository.save({ test: 'hi redis' });
  }
}
