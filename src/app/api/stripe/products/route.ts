import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'

export async function GET() {
  try {
    const stripe = getStripe()
    const products = await stripe.products.list({ active: true, limit: 10 })
    return NextResponse.json({ products })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Unable to fetch products' }, { status: 500 })
  }
}
