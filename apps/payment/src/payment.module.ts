import { Module } from '@nestjs/common';
import { PaymentController } from './payment/payment.controller';
import { TicketService } from './ticket/ticket.service';
import { ConfigModule } from '@app/common/config/config.module';
import { LoggerModule } from '@app/common/logger/logger.module';
import {
  ClientsModule,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { StripeModule } from '@golevelup/nestjs-stripe';
import { PaymentService } from './payment/payment.service';
import { StripeWebhookHandlerService } from './payment/stripe-webhook-handler.service';
import { UserService } from './user/user.service';
import { MailerService } from './mailer/mailer.service';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    StripeModule.forRootAsync(StripeModule, {
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        apiKey: configService.get('api.stripe.key'),
        webhookConfig: {
          stripeSecrets: {
            account: configService.get('api.stripe.webhook_secret'),
          },
          requestBodyProperty: 'rawBody',
        },
      }),
    }),
    ClientsModule.registerAsync([
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
        name: 'MAILER_SERVICE',
        useFactory: async (configService: ConfigService) => {
          return {
            transport:
              Transport[
                configService.get(
                  'services.mailer.transport',
                ) as keyof Transport
              ],
            options: configService.get(
              'services.mailer.options',
            ) as MicroserviceOptions,
          };
        },
      },
    ]),
  ],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    TicketService,
    UserService,
    MailerService,
    StripeWebhookHandlerService,
  ],
})
export class PaymentModule {}
