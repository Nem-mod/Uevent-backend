import { NestFactory } from '@nestjs/core';
import { MailerModule } from './mailer.module';
import { ConfigModule } from '@app/common/config/config.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { PgHttpTypeormExceptionInterceptor } from '@app/common/database/typeorm/exceptions/postgres/pg-http.typeorm.exception.interceptor';
import { Logger } from 'nestjs-pino';
import { HttpToRpcExceptionFilter } from './http-to-rpc.exception.filter';

async function bootstrap() {
  // TODO: Create mailer with interface and one file for one email type. One controller endpoint (eventpattern) for one email type
  const appContext = await NestFactory.createApplicationContext(ConfigModule);
  const configService = appContext.get(ConfigService);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MailerModule,
    {
      transport:
        Transport[
          configService.get('services.mailer.transport') as keyof Transport
        ],
      options: configService.get(
        'services.mailer.options',
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
