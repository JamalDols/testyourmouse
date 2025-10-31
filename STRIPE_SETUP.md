# 💳 Stripe Integration Setup

## Quick Setup

1. **Copy environment variables**

   ```bash
   cp .env.example .env.local
   ```

2. **Fill in your Stripe TEST keys in `.env.local`**

   Mode is detected automatically based on URL (localhost/dev = test, production URL = live):

   ```bash
   STRIPE_SECRET_KEY=sk_test_YOUR_TEST_SECRET_KEY
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_TEST_PUBLISHABLE_KEY
   STRIPE_PRICE_ID=price_YOUR_TEST_PRICE_ID
   STRIPE_PRODUCT_ID=prod_YOUR_TEST_PRODUCT_ID
   STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

3. **Install Stripe CLI** (for webhook testing)

   ```bash
   brew install stripe/stripe-cli/stripe
   ```

4. **Login to Stripe CLI**

   ```bash
   stripe login
   ```

5. **Forward webhooks to local server**

   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```

   This will give you a webhook secret like `whsec_xxxxx` - add it to `.env.local` as `STRIPE_WEBHOOK_SECRET`

## Test the Integration

1. **Start dev server**

   ```bash
   npm run dev
   ```

2. **Go to Pro Tools page**

   - Navigate to `/pro-tools`
   - Click "Unlock Now"
   - Enter any email
   - Click "Continue to Payment"

3. **Use Stripe test card**

   ```
   Card Number: 4242 4242 4242 4242
   Expiry: Any future date (e.g., 12/34)
   CVC: Any 3 digits (e.g., 123)
   ZIP: Any 5 digits (e.g., 12345)
   ```

4. **Check webhook received**
   - In the terminal running `stripe listen`, you should see the webhook event
   - Check browser console for "✅ Payment successful"
   - Pro Tools should unlock automatically

## Going to Production

### 1. Get Production Keys

- Go to [Stripe Dashboard](https://dashboard.stripe.com)
- Click "Developers" → "API Keys"
- Activate your account if needed
- Copy your **live** keys

### 2. Create Production Product & Price

- Go to Stripe Dashboard → Products → Add Product
- Create your product with live price
- Copy the Product ID and Price ID

### 3. Update .env.local for Production

Simply replace the keys in `.env.local` with your **LIVE** keys:

```bash
# Replace with LIVE keys (sk_live_*, pk_live_*)
STRIPE_SECRET_KEY=sk_live_YOUR_REAL_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_REAL_PUBLISHABLE_KEY
STRIPE_PRICE_ID=price_YOUR_LIVE_PRICE_ID
STRIPE_PRODUCT_ID=prod_YOUR_LIVE_PRODUCT_ID
STRIPE_WEBHOOK_SECRET=whsec_YOUR_PRODUCTION_WEBHOOK_SECRET

# Update base URL to your production domain
NEXT_PUBLIC_BASE_URL=https://testyourmouse.com
```

**Note:** Mode is detected automatically. Since your production URL won't contain "localhost" or "dev", it will automatically use production mode.

### 4. Set up Production Webhook

- Go to Stripe Dashboard → Developers → Webhooks
- Add endpoint: `https://testyourmouse.com/api/webhook`
- Select events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`
- Copy the signing secret → Update `STRIPE_WEBHOOK_SECRET` in your production environment

### 5. Deploy

When deploying to Vercel, add all environment variables:

```bash
vercel env add STRIPE_SECRET_KEY
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
vercel env add STRIPE_PRICE_ID
vercel env add STRIPE_PRODUCT_ID
vercel env add STRIPE_WEBHOOK_SECRET
vercel env add NEXT_PUBLIC_BASE_URL
```

Then deploy:

```bash
vercel --prod
```

````

## Webhook Events

The webhook endpoint (`/api/webhook`) listens for:

- `checkout.session.completed` - Payment successful
- `payment_intent.succeeded` - Payment processed
- `payment_intent.payment_failed` - Payment failed

## Security Notes

⚠️ **NEVER commit `.env.local` to git!**
✅ Already in `.gitignore`

⚠️ **Always verify webhook signatures in production!**
✅ Already implemented in `/api/webhook/route.ts`

⚠️ **Use test mode for development**
✅ Default mode is `test`

## Troubleshooting

### "Cannot find module 'stripe'"

```bash
npm install stripe @stripe/stripe-js
````

### Webhook not receiving events

- Make sure `stripe listen` is running
- Check webhook secret in `.env.local`
- Check terminal output for errors

### Payment successful but not unlocking

- Check browser console for errors
- Check localStorage for `testyourmouse_pro_unlocked`
- Try clearing cache and retrying

### Testing Different Scenarios

**Successful payment:**

```
4242 4242 4242 4242
```

**Payment requires authentication:**

```
4000 0025 0000 3155
```

**Payment declined:**

```
4000 0000 0000 9995
```

More test cards: https://stripe.com/docs/testing

## Support

If you have issues:

1. Check Stripe Dashboard → Logs
2. Check Next.js console output
3. Check browser console
4. Contact support@testyourmouse.com
