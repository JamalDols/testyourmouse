// Stripe client initialization
import Stripe from "stripe";
import { stripeConfig, validateStripeConfig } from "./stripe-config";

// Validate config on import
validateStripeConfig();

// Initialize Stripe with the appropriate secret key
export const stripe = new Stripe(stripeConfig.secretKey, {
  apiVersion: "2025-10-29.clover",
  typescript: true,
});

// Helper to format price for display
export function formatPrice(amount: number, currency: string = "usd"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}
