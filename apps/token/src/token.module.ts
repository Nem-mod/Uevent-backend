import { Module } from '@nestjs/common';
import { RedisRedisOmModule } from '@app/common/database/redis-om/redis.redis-om.module';
import { ConfigModule } from '@app/common/config/config.module';
import { LoggerModule } from '@app/common/logger/logger.module';
import { UserVerifyTokensController } from './user/verify/user.verify.tokens.controller';
import { UserVerifyTokensService } from './user/verify/user.verify.tokens.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule, LoggerModule, JwtModule, RedisRedisOmModule],
  controllers: [UserVerifyTokensController],
  providers: [
    { provide: 'IBaseTokenService', useClass: UserVerifyTokensService },
  ],
})
export class TokenModule {}
