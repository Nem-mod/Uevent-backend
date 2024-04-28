import { Module } from '@nestjs/common';
import { ConfigModule } from '@app/common/config/config.module';
import { LoggerModule } from '@app/common/logger/logger.module';
import {
  ClientsModule,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { OrganizationService } from './organization/organization.service';
import { OrganizationController } from './organization/organization.controller';
import { EventController } from './event/event.controller';
import { EventService } from './event/event.service';
import { LocalAuthGuard } from './common/guards/local-auth.guard';
import { LocalStrategy } from './common/strategies/local.strategy';
import { RefreshAuthGuard } from './common/guards/refresh-auth.guard';
import { RefreshStrategy } from './common/strategies/refresh.strategy';
import { AccessAuthGuard } from './common/guards/access-auth.guard';
import { AccessStrategy } from './common/strategies/access.strategy';
import { TicketService } from './ticket/ticket.service';
import { TicketController } from './ticket/ticket.controller';

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
      {
        inject: [ConfigService],
        name: 'TICKET_SERVICE',
        useFactory: async (configService: ConfigService) => {
          return {
            transport:
              Transport[
                configService.get(
                  'services.ticket.transport',
                ) as keyof Transport
              ],
            options: configService.get(
              'services.ticket.options',
            ) as MicroserviceOptions,
          };
        },
      },
    ]),
  ],
  providers: [
    UserService,
    AuthService,
    AccessStrategy,
    AccessAuthGuard,
    RefreshStrategy,
    RefreshAuthGuard,
    LocalStrategy,
    LocalAuthGuard,
    OrganizationService,
    EventService,
    TicketService,
  ],
  controllers: [
    UserController,
    AuthController,
    OrganizationController,
    EventController,
    TicketController,
  ],
})
export class GatewayModule {}
