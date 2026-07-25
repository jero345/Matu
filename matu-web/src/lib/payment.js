/**
 * Payment hand-off.
 *
 * Nothing here asks the shopper for card numbers: MATU sends the order to the
 * provider and the shopper finishes on the provider's own hosted page. That is
 * the only way to take payments from a static front-end without becoming
 * responsible for card data (PCI scope stays with the provider).
 *
 * To go live, create a serverless function that builds the session with your
 * secret key and returns its URL, then point `ENDPOINT` at it:
 *
 *   // api/checkout.js  (Vercel serverless function)
 *   import Stripe from 'stripe'
 *   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
 *   export default async function handler(req, res) {
 *     const { items, email, shipping } = req.body
 *     const session = await stripe.checkout.sessions.create({
 *       mode: 'payment',
 *       customer_email: email,
 *       line_items: items.map((i) => ({ price: i.priceId, quantity: i.qty })),
 *       success_url: `${process.env.SITE_URL}/?order=ok`,
 *       cancel_url: `${process.env.SITE_URL}/?order=cancelled`,
 *     })
 *     res.status(200).json({ url: session.url })
 *   }
 *
 * Mercado Pago works the same way with a Preference and `init_point`.
 */
const ENDPOINT = import.meta.env.VITE_CHECKOUT_ENDPOINT ?? ''

export const isPaymentConfigured = Boolean(ENDPOINT)

export async function startPayment(order) {
  if (!ENDPOINT) {
    // No provider wired up yet — the UI shows the order as recorded so the flow
    // can be reviewed end to end.
    return { ok: true, pending: true, reference: reference() }
  }

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  })

  if (!response.ok) throw new Error(`Checkout failed (${response.status})`)

  const { url } = await response.json()
  if (!url) throw new Error('Checkout session did not return a URL')

  window.location.assign(url)
  return { ok: true, redirected: true }
}

function reference() {
  const n = Math.floor(Date.now() / 1000)
    .toString(36)
    .toUpperCase()
  return `MATU-${n}`
}
