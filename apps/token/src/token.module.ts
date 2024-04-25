import { Module } from '@nestjs/common';
import { RedisRedisOmModule } from '@app/common/database/redis-om/redis.redis-om.module';
import { ConfigModule } from '@app/common/config/config.module';
import { LoggerModule } from '@app/common/logger/logger.module';
import { UserVerifyTokensController } from './user/verify/user.verify.tokens.controller';
import { UserVerifyTokensService } from './user/verify/user.verify.tokens.service';
import { JwtModule } from '@nestjs/jwt';
import { UserRefreshTokensService } from './user/refresh/user.refresh.tokens.service';
import { UserResetPswTokensService } from './user/reset-psw/user.reset-psw.tokens.service';
import { UserAccessTokensService } from './user/access/user.access.tokens.service';
import { UserAccessTokensController } from './user/access/user.access.tokens.controller';
import { UserRefreshTokensController } from './user/refresh/user.refresh.tokens.controller';
import { UserResetPswTokensController } from './user/reset-psw/user.reset-psw.tokens.controller';

@Module({
  imports: [ConfigModule, LoggerModule, JwtModule, RedisRedisOmModule],
  controllers: [
    UserVerifyTokensController,
    UserAccessTokensController,
    UserRefreshTokensController,
    UserResetPswTokensController,
  ],
  providers: [
    { provide: 'verifyService', useClass: UserVerifyTokensService },
    { provide: 'accessService', useClass: UserAccessTokensService },
    { provide: 'refreshService', useClass: UserRefreshTokensService },
    { provide: 'resetPswService', useClass: UserResetPswTokensService },
  ],
})
export class TokenModule {}
