import { Module } from '@nestjs/common';
import { ConfigModule } from '@app/common/config/config.module';
import { LoggerModule } from '@app/common/logger/logger.module';
import {
  ClientsModule,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { UserGatewayController } from './user/user.gateway.controller';
import { UserGatewayService } from './user/user.gateway.service';
import { MailerGatewayService } from './mailer/mailer.gateway.service';
import { MailerGatewayController } from './mailer/mailer.gateway.controller';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        name: 'USER_SERVICE',
        useFactory: async (configService: ConfigService) => {
          console.log(configService);
          return {
            transport:
              Transport[
                configService.get('services.user.transport') as keyof Transport
              ],
            options: configService.get(
              'services.user.options',
            ) as MicroserviceOptions,
          };
        },
      },
      {
        inject: [ConfigService],
        name: 'MAILER_SERVICE',
        useFactory: async (configService: ConfigService) => ({
          transport:
            Transport[
              configService.get('services.mailer.transport') as keyof Transport
            ],
          options: configService.get(
            'services.mailer.options',
          ) as MicroserviceOptions,
        }),
      },
      {
        inject: [ConfigService],
        name: 'TOKEN_SERVICE',
        useFactory: async (configService: ConfigService) => ({
          transport:
            Transport[
              configService.get('services.token.transport') as keyof Transport
            ],
          options: configService.get(
            'services.token.options',
          ) as MicroserviceOptions,
        }),
      },
    ]),
  ],
  providers: [UserGatewayService, MailerGatewayService],
  controllers: [UserGatewayController, MailerGatewayController],
})
export class GatewayModule {}
