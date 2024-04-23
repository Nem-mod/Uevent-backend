import { Module } from '@nestjs/common';
import { NestRedisOmModule } from '@app/common/database/redis-om/module/nest.redis-om.module';
import { TestSchema } from '../../../../../apps/token/src/schemas/test.schema';
import { ConfigModule } from '@app/common/config/config.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    NestRedisOmModule.forRootAsync({
      schemas: [TestSchema],
      // imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        console.log(configService);
        return { url: configService.get('db.redis.uri') };
      },
    }),
  ],
  exports: [NestRedisOmModule],
})
export class RedisConnectRedisOmModule {}
