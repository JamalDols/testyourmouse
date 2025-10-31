import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { stripeConfig } from "@/lib/stripe-config";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    // Get base URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment", // One-time payment
      payment_method_types: ["card"],
      line_items: [
        {
          price: stripeConfig.priceId,
          quantity: 1,
        },
      ],
      customer_email: email,
      success_url: `${baseUrl}/pro-tools?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pro-tools?canceled=true`,
      metadata: {
        product_type: "pro_tools_unlock",
        email: email,
      },
      // Optional: customize the Checkout page
      billing_address_collection: "auto",
      // Send email receipt automatically
      payment_intent_data: {
        metadata: {
          product: "TestYourMouse Pro Tools",
          email: email,
        },
      },
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: error.message || "Failed to create checkout session" }, { status: 500 });
  }
}
