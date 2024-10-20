import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import connectDB from '../../../lib/mongodb';
import Subscription from '../../../models/Subscription';

const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY));

export async function POST(req: Request) {
  await connectDB();
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET as string);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  switch (event.type) {
    case 'customer.subscription.created':
      const subscription = event.data.object as Stripe.Subscription;
      await Subscription.create({
        userId: subscription.metadata?.userId,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeSubscriptionId: subscription.id,
        status: subscription.status,
      });
      break;
    case 'customer.subscription.updated':
      // Handle subscription update
      break;
    case 'customer.subscription.deleted':
      // Handle subscription deletion
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}