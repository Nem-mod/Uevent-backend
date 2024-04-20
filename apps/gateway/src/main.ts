import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { VersioningType } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { RpcExceptionToHttpExceptionFilter } from './rpc.to.http.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const configService = app.get(ConfigService);

  app.useGlobalFilters(new RpcExceptionToHttpExceptionFilter());

  app.useLogger(app.get(Logger));

  app.enableCors({
    credentials: true,
    origin: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(cookieParser());

  await app.listen(configService.get('services.gateway.port'));
}
bootstrap();
