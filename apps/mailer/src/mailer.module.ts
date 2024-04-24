import { Module } from '@nestjs/common';
import { MailerController } from './mailer.controller';
import { MailerService } from './mailer.service';
import { LoggerModule } from '@app/common/logger/logger.module';
import { ConfigModule } from '@app/common/config/config.module';
import { UserVerificationMail } from './mail-types/user-verification.mail';
import { SendGridModule } from '@anchan828/nest-sendgrid';
import { ConfigService } from '@nestjs/config';
import {
  ClientsModule,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    SendGridModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        apikey: configService.get(`api.sendgrid.key`),
      }),
      inject: [ConfigService],
    }),
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        name: 'TOKEN_SERVICE',
        useFactory: async (configService: ConfigService) => {
          return {
            transport:
              Transport[
                configService.get('services.token.transport') as keyof Transport
              ],
            options: configService.get(
              'services.token.options',
            ) as MicroserviceOptions,
          };
        },
      },
    ]),
  ],
  controllers: [MailerController],
  providers: [
    MailerService,
    { provide: 'UserVerificationMail', useClass: UserVerificationMail },
  ],
})
export class MailerModule {}
