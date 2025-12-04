import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();

    if (!amount || isNaN(amount) || amount < 1) {
      return NextResponse.json({ error: "Valid amount is required (min $1)" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Buy TestYourMouse a Coffee ☕",
              description: "Thank you for supporting the project!",
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/pro-tools?donation_success=true`,
      cancel_url: `${baseUrl}/pro-tools?donation_canceled=true`,
      metadata: {
        type: "donation",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Donation error:", error);
    return NextResponse.json({ error: error.message || "Failed to create donation session" }, { status: 500 });
  }
}
