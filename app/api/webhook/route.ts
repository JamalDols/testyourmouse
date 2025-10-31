import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { stripeConfig } from "@/lib/stripe-config";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    // Verify webhook signature
    if (stripeConfig.webhookSecret) {
      event = stripe.webhooks.constructEvent(body, signature, stripeConfig.webhookSecret);
    } else {
      // For local development without webhook secret
      console.warn("⚠️  Webhook signature verification skipped (no secret configured)");
      event = JSON.parse(body);
    }
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Handle the event
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        console.log("✅ Payment successful:", {
          sessionId: session.id,
          email: session.customer_email,
          amount: session.amount_total,
          currency: session.currency,
        });

        // Here you could:
        // 1. Save to database
        // 2. Send confirmation email
        // 3. Generate unlock code
        // For now, we just log it

        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("💳 Payment intent succeeded:", paymentIntent.id);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error("❌ Payment failed:", paymentIntent.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
