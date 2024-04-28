import { NestFactory } from '@nestjs/core';
import { EventModule } from './event.module';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { PgHttpTypeormExceptionInterceptor } from '@app/common/database/typeorm/postgres/exceptions/postgres/pg-http.typeorm.exception.interceptor';
import { HttpToRpcExceptionFilter } from './event/http-to-rpc.exception.filter';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@app/common/config/config.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(ConfigModule);
  const configService = appContext.get(ConfigService);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    EventModule,
    {
      transport:
        Transport[
          configService.get('services.event.transport') as keyof Transport
        ],
      options: configService.get(
        'services.event.options',
      ) as MicroserviceOptions,
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalInterceptors(new PgHttpTypeormExceptionInterceptor());
  app.useGlobalFilters(new HttpToRpcExceptionFilter());
  app.useLogger(app.get(Logger));

  await app.listen();
  await appContext.close();
}
bootstrap();
