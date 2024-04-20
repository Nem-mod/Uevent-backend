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

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        name: 'USER_SERVICE',
        useFactory: async (configService: ConfigService) => ({
          transport:
            Transport[
              configService.get('services.user.transport') as keyof Transport
            ],
          options: configService.get(
            'services.user.options',
          ) as MicroserviceOptions,
        }),
      },
    ]),
  ],
  providers: [UserGatewayService],
  controllers: [UserGatewayController],
})
export class GatewayModule {}
