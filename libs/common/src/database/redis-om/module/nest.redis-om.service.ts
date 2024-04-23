import { Inject } from '@nestjs/common';
import { NEST_REDISOM_MODULE_OPTIONS } from '@app/common/database/redis-om/module/nest.redis-om.constants';
import { createClient, RedisClientOptions } from 'redis';

export class NestRedisOmService {
  private redis = null;

  constructor(
    @Inject(NEST_REDISOM_MODULE_OPTIONS)
    private readonly options: RedisClientOptions,
  ) {
    this.redis = createClient(options);
  }

  async connect() {
    await this.redis.connect();
  }
}
