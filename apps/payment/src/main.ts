import { NestFactory } from '@nestjs/core';
import { PaymentModule } from './payment.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { VersioningType } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule, { rawBody: true });
  const configService = app.get(ConfigService);
  const microservice = app.connectMicroservice<MicroserviceOptions>(
    {
      transport:
        Transport[
          configService.get('services.payment.transport') as keyof Transport
        ],
      options: configService.get(
        'services.payment.options',
      ) as MicroserviceOptions,
    },
    { inheritAppConfig: true },
  );
  app.useLogger(app.get(Logger));

  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.startAllMicroservices();
  await app.listen(configService.get('services.payment.httpPort'));
}
bootstrap();
