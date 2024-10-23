import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import connectDB from '../../../lib/mongodb';
import { v4 as uuidv4 } from 'uuid';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  await connectDB();
  const formData = await req.formData();
  const priceId = formData.get('priceId');
  let userId = formData.get('userId');

  if (!userId) {
    userId = uuidv4();
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: priceId as string,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/canceled`,
      client_reference_id: userId as string,
    });

    if (session.url) {
      return NextResponse.redirect(session.url);
    } else {
      throw new Error('Session URL is undefined');
    }
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}