import { Module } from '@nestjs/common';
import { NestRedisOmModule } from '@app/common/database/redis-om/module/nest.redis-om.module';
import { ConfigModule } from '@app/common/config/config.module';
import { UserVerifyTokensSchema } from '../../../../../apps/token/src/user/verify/user.verify.tokens.schema';
import { UserRefreshTokensSchema } from '../../../../../apps/token/src/user/refresh/user.refresh.tokens.schema';
import { UserResetPswTokensSchema } from '../../../../../apps/token/src/user/reset-psw/user.reset-psw.tokens.schema';
import { UserAccessTokensSchema } from '../../../../../apps/token/src/user/access/user.access.tokens.schema';

@Module({
  imports: [
    ConfigModule,
    NestRedisOmModule.forRoot(
      [
        UserVerifyTokensSchema,
        UserRefreshTokensSchema,
        UserResetPswTokensSchema,
        UserAccessTokensSchema,
      ],
      {
        url: 'redis://default:OrNeRmipafJKRCixxUCowRrmvJPurTDK@viaduct.proxy.rlwy.net:50185',
      },
    ),
  ],
  exports: [NestRedisOmModule],
})
export class RedisConnectRedisOmModule {}
