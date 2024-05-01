import { Injectable } from '@nestjs/common';
import { StripeWebhookHandler } from '@golevelup/nestjs-stripe';
import Stripe from 'stripe';
import { PaymentService } from './payment.service';

@Injectable()
export class StripeWebhookHandlerService {
  constructor(private readonly paymentService: PaymentService) {}

  @StripeWebhookHandler('checkout.session.completed')
  async onCheckoutCompleted(evt: Stripe.CheckoutSessionCompletedEvent) {
    console.log('checkout completed');
    await this.paymentService.completePayment(
      parseInt(evt.data.object.metadata.ticketId),
      evt.data.object.customer_email || evt.data.object.metadata.email,
      evt.data.object.metadata.returnLink,
    );
  }

  @StripeWebhookHandler('checkout.session.expired')
  async onCheckoutExpired(evt: Stripe.CheckoutSessionExpiredEvent) {
    console.log('checkout expired');
    await this.paymentService.unblockTicket(
      parseInt(evt.data.object.metadata.ticketId),
    );
  }

  // @StripeWebhookHandler('payment_intent.created')
  // async onCreated(evt: Stripe.PaymentIntentCreatedEvent) {
  //   console.log('payment created');
  //   console.log(evt.data.object.id);
  // }

  // @StripeWebhookHandler('payment_intent.canceled')
  // async onCancelled(evt: Stripe.PaymentIntentCanceledEvent) {
  //   console.log('payment canceled');
  // }
  //
  // @StripeWebhookHandler('payment_intent.payment_failed')
  // async onFailed(evt: StripeEvent) {
  //   console.log('payment failed');
  // }
  //
  // @StripeWebhookHandler('payment_intent.succeeded')
  // async onSucceeded(evt: StripeEvent) {
  //   console.log('payment succeeded');
  // }
}
