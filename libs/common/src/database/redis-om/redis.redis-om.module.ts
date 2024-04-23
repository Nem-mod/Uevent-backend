import { Module } from '@nestjs/common';
import { RedisConnectRedisOmModule } from '@app/common/database/redis-om/redis.connect.redis-om.module';

@Module({
  imports: [RedisConnectRedisOmModule],
  exports: [RedisConnectRedisOmModule],
})
export class RedisRedisOmModule {}
