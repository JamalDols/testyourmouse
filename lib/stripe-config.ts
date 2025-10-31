// Stripe configuration - automatically detects test/production based on URL

// Detectar si estamos en desarrollo basándonos en la URL
function isDevEnvironment(): boolean {
  // En el servidor, usar NODE_ENV
  if (typeof window === "undefined") {
    return process.env.NODE_ENV === "development";
  }

  // En el cliente, detectar por URL
  const url = window.location.hostname;
  return url.includes("localhost") || url.includes("dev");
}

const isDev = isDevEnvironment();

export const stripeConfig = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  secretKey: process.env.STRIPE_SECRET_KEY!,
  priceId: process.env.STRIPE_PRICE_ID!,
  productId: process.env.STRIPE_PRODUCT_ID!,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
  mode: isDev ? "test" : ("production" as const),
};

// Client-side config (only public keys)
export const clientStripeConfig = {
  publishableKey: stripeConfig.publishableKey,
  priceId: stripeConfig.priceId,
  mode: stripeConfig.mode,
};

// Validate configuration
export function validateStripeConfig() {
  const required = ["publishableKey", "secretKey", "priceId", "productId"];

  for (const key of required) {
    if (!stripeConfig[key as keyof typeof stripeConfig]) {
      throw new Error(`Missing Stripe configuration: ${key}. Check your .env.local file.`);
    }
  }

  // Webhook secret is optional for local development
  if (!stripeConfig.webhookSecret && process.env.NODE_ENV === "production") {
    console.warn("⚠️  STRIPE_WEBHOOK_SECRET not set. Webhooks will not be verified!");
  }

  console.log(`🔧 Stripe mode: ${stripeConfig.mode} (${isDev ? "development" : "production"} environment)`);
}
