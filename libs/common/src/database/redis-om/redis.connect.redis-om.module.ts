import { Module } from '@nestjs/common';
import { NestRedisOmModule } from '@app/common/database/redis-om/module/nest.redis-om.module';
import { ConfigModule } from '@app/common/config/config.module';
import { UserVerifyTokensSchema } from '../../../../../apps/token/src/user/verify/user.verify.tokens.schema';

@Module({
  imports: [
    ConfigModule,
    NestRedisOmModule.forRoot([UserVerifyTokensSchema], {
      url: 'redis://default:OrNeRmipafJKRCixxUCowRrmvJPurTDK@viaduct.proxy.rlwy.net:50185',
    }),
  ],
  exports: [NestRedisOmModule],
})
export class RedisConnectRedisOmModule {}
