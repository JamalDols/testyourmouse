import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { stripeConfig } from "@/lib/stripe-config";

// Cache en memoria
let priceCache: {
  amount: number;
  currency: string;
  formatted: string;
  timestamp: number;
} | null = null;

// 24 horas en milisegundos
const CACHE_DURATION = 24 * 60 * 60 * 1000;

export async function GET() {
  try {
    // Verificar si el caché es válido
    const now = Date.now();
    if (priceCache && now - priceCache.timestamp < CACHE_DURATION) {
      console.log("💰 Returning cached price:", priceCache);
      return NextResponse.json({
        ...priceCache,
        cached: true,
      });
    }

    // Obtener el precio desde Stripe
    console.log("🔄 Fetching price from Stripe...");
    const price = await stripe.prices.retrieve(stripeConfig.priceId);

    if (!price.unit_amount) {
      throw new Error("Price has no unit_amount");
    }

    // Formatear el precio
    const amount = price.unit_amount / 100; // Convertir de centavos a dólares
    const currency = price.currency.toUpperCase();
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: price.currency,
    }).format(amount);

    // Actualizar el caché
    priceCache = {
      amount,
      currency,
      formatted,
      timestamp: now,
    };

    console.log("✅ Price fetched and cached:", priceCache);

    return NextResponse.json({
      ...priceCache,
      cached: false,
    });
  } catch (error) {
    console.error("❌ Error fetching price:", error);

    // Fallback a $4.99 si hay error
    return NextResponse.json({
      amount: 4.99,
      currency: "USD",
      formatted: "$4.99",
      cached: false,
      error: true,
    });
  }
}
