import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { resend, emailConfig } from "@/lib/resend";
import { RecoveryEmail, getRecoveryEmailText } from "@/emails/RecoveryEmail";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    // Search for successful payments in Stripe
    const sessions = await stripe.checkout.sessions.list({
      customer_details: { email: email },
      status: "complete",
      limit: 1, // We just need to know if they bought it at least once
    });

    // Also check payment intents if needed, but checkout sessions are the main way
    // If no sessions found by email, we might want to search customers, but let's stick to sessions for now as it's safer.

    const hasPurchase = sessions.data.length > 0;

    if (hasPurchase) {
      const session = sessions.data[0];

      // Generate recovery token
      const token = jwt.sign(
        {
          email: email,
          sessionId: session.id,
          type: "purchase_recovery",
        },
        process.env.JWT_SECRET || "default_secret",
        { expiresIn: "365d" }
      );

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const recoveryUrl = `${baseUrl}/recover?token=${token}`;

      // Send recovery email
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: emailConfig.from,
          replyTo: emailConfig.replyTo,
          to: email,
          subject: "Recover your TestYourMouse Pro purchase",
          html: RecoveryEmail({ recoveryUrl }),
          text: getRecoveryEmailText({ recoveryUrl }),
        });
        console.log(`Recovery email sent to ${email}`);
      } else {
        console.error("Resend API Key not configured, cannot send recovery email");
        return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
      }
    } else {
      console.log(`No purchase found for ${email}`);
      // We still return success to prevent email enumeration, or maybe we want to tell them?
      // For a better UX, we might want to tell them if no purchase was found, but for security it's better not to.
      // However, since this is a "I already bought this" feature, users expect feedback.
      // Let's return success but maybe send an email saying "No purchase found" if we want to be helpful?
      // For now, let's just return success and do nothing if no purchase found (silent failure for privacy),
      // OR we can return a generic "If a purchase exists, an email has been sent."
    }

    return NextResponse.json({
      success: true,
      message: "If a purchase exists associated with this email, we have sent a recovery link.",
    });
  } catch (error: any) {
    console.error("Send recovery error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
