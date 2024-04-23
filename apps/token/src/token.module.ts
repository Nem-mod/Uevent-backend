import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { RedisRedisOmModule } from '@app/common/database/redis-om/redis.redis-om.module';
import { ConfigModule } from '@app/common/config/config.module';
import { LoggerModule } from '@app/common/logger/logger.module';

@Module({
  imports: [ConfigModule, LoggerModule, RedisRedisOmModule],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
