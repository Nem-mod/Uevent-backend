import { DynamicModule, Module } from '@nestjs/common';
import { createClient, RedisClientOptions } from 'redis';
import { Schema, Repository } from 'redis-om';
import { NestjsRedisOmModuleAsyncOptions } from '@app/common/database/redis-om/module/nest.redis-om.module.async-options.type';

@Module({})
export class NestRedisOmModule {
  static async forRoot(
    schemas: Schema[],
    options: RedisClientOptions,
  ): Promise<DynamicModule> {
    const redis = createClient(options);
    await redis.connect();
    const repositories = schemas.map((schema) => {
      return {
        provide: schema.schemaName,
        useValue: new Repository(schema, redis),
      };
    });

    return {
      module: NestRedisOmModule,
      providers: repositories,
      exports: repositories,
    };
  }

  static async forRootAsync(
    options: NestjsRedisOmModuleAsyncOptions,
  ): Promise<DynamicModule> {
    console.log(options.inject);
    return {
      ...(await this.forRoot(
        options.schemas,
        await options.useFactory(options.inject),
      )),
      // imports: options.imports || [],
    };
  }
}
