import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = (await headers()).get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: 'Missing webhook signature or secret' }, { status: 400 })
  }

  try {
    const stripe = getStripe()
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    switch (event.type) {
      case 'checkout.session.completed':
        console.log('Checkout completed', { eventId: event.id, type: event.type })
        break
      default:
        console.log('Unhandled Stripe event', { eventId: event.id, type: event.type })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Stripe webhook error', error)
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 })
  }
}
