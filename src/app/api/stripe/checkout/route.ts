import { NextRequest, NextResponse } from 'next/server'
import { getServerOrigin } from '@/lib/env'
import { getStripe } from '@/lib/stripe'

const supportedLocales = new Set(['en', 'pt-BR'])

export async function POST(req: NextRequest) {
  try {
    const { priceId, quantity = 1, locale = 'en' } = await req.json()

    if (typeof priceId !== 'string' || !priceId.startsWith('price_')) {
      return NextResponse.json({ error: 'A valid priceId is required' }, { status: 400 })
    }

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      return NextResponse.json({ error: 'quantity must be an integer between 1 and 10' }, { status: 400 })
    }

    if (typeof locale !== 'string' || !supportedLocales.has(locale)) {
      return NextResponse.json({ error: 'locale must be one of: en, pt-BR' }, { status: 400 })
    }

    const origin = getServerOrigin()
    const stripe = getStripe()
    const price = await stripe.prices.retrieve(priceId)

    if (!price.active) {
      return NextResponse.json({ error: 'Selected price is inactive' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity }],
      success_url: `${origin}/${locale}?checkout=success`,
      cancel_url: `${origin}/${locale}?checkout=cancelled`,
      locale: locale === 'pt-BR' ? 'pt' : 'en',
    })

    return NextResponse.json({ id: session.id, url: session.url })
  } catch (error) {
    console.error('Stripe checkout error', error)
    return NextResponse.json({ error: 'Unable to create checkout session' }, { status: 500 })
  }
}
