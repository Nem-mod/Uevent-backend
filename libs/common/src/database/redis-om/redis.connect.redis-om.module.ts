import { Module } from '@nestjs/common';
import { NestRedisOmModule } from '@app/common/database/redis-om/module/nest.redis-om.module';
import { TestSchema } from '../../../../../apps/token/src/schemas/test.schema';
import { ConfigModule } from '@app/common/config/config.module';

@Module({
  imports: [
    ConfigModule,
    NestRedisOmModule.forRoot([TestSchema], {
      url: 'redis://default:OrNeRmipafJKRCixxUCowRrmvJPurTDK@viaduct.proxy.rlwy.net:50185',
    }),
  ],
  exports: [NestRedisOmModule],
})
export class RedisConnectRedisOmModule {}
