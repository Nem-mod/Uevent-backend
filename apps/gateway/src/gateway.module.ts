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
import { AuthGatewayController } from './auth/auth.gateway.controller';
import { AuthGatewayService } from './auth/auth.gateway.service';
import { JwtAccessStrategy } from './gateway/strategies/jwt-access.strategy';
import { AccessJwtAuthGuard } from './gateway/guards/access-jwt-auth.guard';
import { JwtRefreshStrategy } from './gateway/strategies/jwt-refresh.strategy';
import { RefreshJwtAuthGuard } from './gateway/guards/refresh-jwt-auth.guard';
import { LocalAuthGuard } from './gateway/guards/local-auth.guard';
import { LocalStrategy } from './gateway/strategies/local.strategy';
import { OrganizationGatewayService } from './organization/organization.gateway.service';
import { OrganizationGatewayController } from './organization/organization.gateway.controller';
import { EventGatewayController } from './event/event.gateway.controller';
import { EventGatewayService } from './event/event.gateway.service';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        name: 'USER_SERVICE',
        useFactory: async (configService: ConfigService) => {
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
        name: 'AUTH_SERVICE',
        useFactory: async (configService: ConfigService) => {
          return {
            transport:
              Transport[
                configService.get('services.auth.transport') as keyof Transport
              ],
            options: configService.get(
              'services.auth.options',
            ) as MicroserviceOptions,
          };
        },
      },
      {
        inject: [ConfigService],
        name: 'ORGANIZATION_SERVICE',
        useFactory: async (configService: ConfigService) => {
          return {
            transport:
              Transport[
                configService.get(
                  'services.organization.transport',
                ) as keyof Transport
              ],
            options: configService.get(
              'services.organization.options',
            ) as MicroserviceOptions,
          };
        },
      },
      {
        inject: [ConfigService],
        name: 'EVENT_SERVICE',
        useFactory: async (configService: ConfigService) => {
          return {
            transport:
                Transport[
                    configService.get('services.event.transport') as keyof Transport
                    ],
            options: configService.get(
                'services.event.options',
            ) as MicroserviceOptions,
          };
        },
      },
    ]),
  ],
  providers: [
    UserGatewayService,
    AuthGatewayService,
    JwtAccessStrategy,
    AccessJwtAuthGuard,
    JwtRefreshStrategy,
    RefreshJwtAuthGuard,
    LocalStrategy,
    LocalAuthGuard,
    OrganizationGatewayService,
    EventGatewayService
  ],
  controllers: [
    UserGatewayController,
    AuthGatewayController,
    OrganizationGatewayController,
    EventGatewayController
  ],
})
export class GatewayModule {}
