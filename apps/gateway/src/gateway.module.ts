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
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { AccessJwtAuthGuard } from './guards/access-jwt-auth.guard';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.guard';

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
    ]),
  ],
  providers: [
    UserGatewayService,
    AuthGatewayService,
    JwtAccessStrategy,
    AccessJwtAuthGuard,
    JwtRefreshStrategy,
    RefreshJwtAuthGuard,
  ],
  controllers: [UserGatewayController, AuthGatewayController],
})
export class GatewayModule {}
