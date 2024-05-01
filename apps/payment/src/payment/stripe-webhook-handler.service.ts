import { Injectable } from '@nestjs/common';
import { StripeWebhookHandler } from '@golevelup/nestjs-stripe';
import StripeEvent from 'stripe';
import { PaymentService } from './payment.service';

@Injectable()
export class StripeWebhookHandlerService {
  constructor(private readonly paymentService: PaymentService) {}

  @StripeWebhookHandler('payment_intent.created')
  async onCreated(evt: StripeEvent) {
    console.log('created');
  }

  @StripeWebhookHandler('payment_intent.canceled')
  async onCancelled(evt: StripeEvent) {
    console.log('canceled');
  }

  @StripeWebhookHandler('payment_intent.payment_failed')
  async onFailed(evt: StripeEvent) {
    console.log('failed');
  }

  @StripeWebhookHandler('payment_intent.succeeded')
  async onSucceeded(evt: StripeEvent) {
    console.log('succeeded');
  }
}
