import { NestFactory } from '@nestjs/core';
import { TokenModule } from './token.module';
import { ConfigModule } from '@app/common/config/config.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { HttpToRpcExceptionFilter } from './http-to-rpc.exception.filter';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(ConfigModule);
  const configService = appContext.get(ConfigService);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TokenModule,
    {
      transport:
        Transport[
          configService.get('services.token.transport') as keyof Transport
        ],
      options: configService.get(
        'services.token.options',
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
  app.useGlobalFilters(new HttpToRpcExceptionFilter());
  app.useLogger(app.get(Logger));

  await app.listen();
  await appContext.close();
}
bootstrap();
