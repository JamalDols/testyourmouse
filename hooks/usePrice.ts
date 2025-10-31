"use client";

import { useEffect, useState } from "react";

interface PriceData {
  amount: number;
  currency: string;
  formatted: string;
  cached?: boolean;
  error?: boolean;
}

const CACHE_KEY = "stripe_price_cache";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas

export function usePrice() {
  const [price, setPrice] = useState<PriceData>({
    amount: 4.99,
    currency: "USD",
    formatted: "$4.99",
  });
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    async function fetchPrice() {
      try {
        // Intentar obtener del localStorage primero
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const cachedData = JSON.parse(cached);
          const now = Date.now();

          // Si el caché es válido (menos de 24h), usarlo
          if (cachedData.timestamp && now - cachedData.timestamp < CACHE_DURATION) {
            console.log("💰 Using localStorage cached price");
            setPrice(cachedData);
            setLoading(false);
            return;
          }
        }

        // Si no hay caché válido, obtener desde la API
        console.log("🔄 Fetching price from API...");
        const response = await fetch("/api/price");
        const data = await response.json();

        // Guardar en localStorage con timestamp
        const priceData = {
          ...data,
          timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(priceData));

        setPrice(data);
      } catch (error) {
        console.error("❌ Error fetching price:", error);
        // Mantener el fallback de $4.99
      } finally {
        setLoading(false);
      }
    }

    fetchPrice();
  }, [mounted]);

  return { price, loading, mounted };
}
