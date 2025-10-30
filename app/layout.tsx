import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ProProvider } from "@/components/ProContext";
import { Toaster } from "@/components/ui/sonner";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://testyourmouse.com"),
  title: {
    default: "TestYourMouse - Testea tu ratón como un pro | Herramientas gratuitas",
    template: "%s | TestYourMouse",
  },
  description:
    "Herramientas profesionales gratuitas para testear tu ratón: CPS Test, Double Click Test, Scroll Test, Tracking & Jitter Analysis, Click Visualizer y más. Optimiza tu setup gaming y mejora tu rendimiento.",
  keywords: [
    "test ratón",
    "mouse test",
    "cps test",
    "double click test",
    "test doble click",
    "jitter test",
    "tracking test",
    "gaming mouse",
    "mouse gaming",
    "test dpi",
    "polling rate",
    "sensor mouse",
    "click speed test",
    "velocidad de clicks",
    "scroll test",
    "mouse analyzer",
  ],
  authors: [{ name: "TestYourMouse" }],
  creator: "TestYourMouse",
  publisher: "TestYourMouse",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://testyourmouse.com",
    title: "TestYourMouse - Testea tu ratón como un pro",
    description: "Herramientas profesionales gratuitas para testear tu ratón: CPS Test, Double Click Test, Tracking & Jitter y más.",
    siteName: "TestYourMouse",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TestYourMouse - Herramientas profesionales para testear tu ratón",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TestYourMouse - Testea tu ratón como un pro",
    description: "Herramientas profesionales gratuitas para testear tu ratón: CPS Test, Double Click Test, Tracking & Jitter y más.",
    images: ["/og-image.png"],
    creator: "@testyourmouse",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://testyourmouse.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={jetbrainsMono.className}>
        <ProProvider>
          {children}
          <Toaster />
        </ProProvider>
      </body>
    </html>
  );
}
