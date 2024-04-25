import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  ClientsModule,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@app/common/config/config.module';
import { LoggerModule } from '@app/common/logger/logger.module';
import { MailerAuthService } from './mailer/mailer.auth.service';
import { TokenAuthService } from './token/token.auth.service';
import { UserAuthService } from './user/user.auth.service';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    ClientsModule.registerAsync([
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
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserAuthService,
    MailerAuthService,
    TokenAuthService,
  ],
})
export class AuthModule {}
