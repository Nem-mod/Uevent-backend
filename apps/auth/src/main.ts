import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@app/common/config/config.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // TODO: add exception filter and create interceptor
  const appContext = await NestFactory.createApplicationContext(ConfigModule);
  const configService = appContext.get(ConfigService);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport:
        Transport[
          configService.get('services.auth.transport') as keyof Transport
        ],
      options: configService.get(
        'services.auth.options',
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
  // app.useGlobalInterceptors(new PgHttpTypeormExceptionInterceptor());
  // app.useGlobalFilters(new HttpToRpcExceptionFilter());
  app.useLogger(app.get(Logger));

  await app.listen();
  await appContext.close();
}
bootstrap();
