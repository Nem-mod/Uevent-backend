import { NestFactory } from '@nestjs/core';
import { TicketModule } from './ticket.module';
import { ConfigModule } from '@app/common/config/config.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { PgHttpTypeormExceptionInterceptor } from '@app/common/database/typeorm/postgres/exceptions/postgres/pg-http.typeorm.exception.interceptor';
import { HttpToRpcExceptionFilter } from '../../organization/src/organization/http-to-rpc.exception.filter';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(ConfigModule);
  const configService = appContext.get(ConfigService);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TicketModule,
    {
      transport:
        Transport[
          configService.get('services.ticket.transport') as keyof Transport
        ],
      options: configService.get(
        'services.ticket.options',
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
