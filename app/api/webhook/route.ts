import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { stripeConfig } from "@/lib/stripe-config";
import { resend, emailConfig } from "@/lib/resend";
import { PaymentConfirmationEmail, getPaymentConfirmationText } from "@/emails/PaymentConfirmationEmail";
import Stripe from "stripe";
import jwt from "jsonwebtoken";

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

        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("✅ PAYMENT SUCCESSFUL");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("Session ID:", session.id);
        console.log("Customer Email:", session.customer_email);
        console.log("Amount:", session.amount_total, session.currency);
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        // Send confirmation email
        if (session.customer_email && session.amount_total) {
          console.log("📧 Attempting to send email...");
          console.log("   From:", emailConfig.from);
          console.log("   To:", session.customer_email);
          console.log("   Reply-To:", emailConfig.replyTo);

          // Check if Resend API key is configured
          if (!process.env.RESEND_API_KEY) {
            console.error("❌ ERROR: RESEND_API_KEY is not configured!");
            console.error("   Please add RESEND_API_KEY to your .env.local file");
          } else {
            console.log("✓ Resend API Key is configured");

            try {
              // Generate recovery token
              const token = jwt.sign(
                {
                  email: session.customer_email,
                  sessionId: session.id,
                  type: "purchase_recovery",
                },
                process.env.JWT_SECRET || "default_secret",
                { expiresIn: "365d" } // Token valid for 1 year
              );

              const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
              const recoveryUrl = `${baseUrl}/recover?token=${token}`;

              const result = await resend.emails.send({
                from: emailConfig.from,
                replyTo: emailConfig.replyTo,
                to: session.customer_email,
                subject: "🎉 Welcome to TestYourMouse Pro!",
                html: PaymentConfirmationEmail({
                  customerEmail: session.customer_email,
                  amount: session.amount_total,
                  currency: session.currency || "usd",
                  sessionId: session.id,
                  recoveryUrl,
                }),
                text: getPaymentConfirmationText({
                  customerEmail: session.customer_email,
                  amount: session.amount_total,
                  currency: session.currency || "usd",
                  sessionId: session.id,
                  recoveryUrl,
                }),
              });

              console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
              console.log("✅ EMAIL SENT SUCCESSFULLY!");
              console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
              console.log("Email ID:", result.data?.id);
              console.log("Result:", JSON.stringify(result, null, 2));
              console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            } catch (emailError: any) {
              console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
              console.error("❌ EMAIL SENDING FAILED!");
              console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
              console.error("Error Type:", emailError.constructor.name);
              console.error("Error Message:", emailError.message);
              console.error("Error Details:", JSON.stringify(emailError, null, 2));
              console.error("Full Error:", emailError);
              console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            }
          }
        } else {
          console.log("⚠️  Skipping email: Missing email or amount");
          console.log("   Email present:", !!session.customer_email);
          console.log("   Amount present:", !!session.amount_total);
        }

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
