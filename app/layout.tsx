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
    default: "TestYourMouse - Test your mouse like a pro | Free Tools",
    template: "%s | TestYourMouse",
  },
  description:
    "Professional free tools to test your mouse: CPS Test, Double Click Test, Scroll Test, Tracking & Jitter Analysis, Click Visualizer and more. Optimize your gaming setup and improve your performance.",
  keywords: [
    "mouse test",
    "cps test",
    "double click test",
    "jitter test",
    "tracking test",
    "gaming mouse",
    "test dpi",
    "polling rate",
    "mouse sensor",
    "click speed test",
    "scroll test",
    "mouse analyzer",
    "mouse tester",
    "gaming mouse test",
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
    locale: "en_US",
    url: "https://testyourmouse.com",
    title: "TestYourMouse - Test your mouse like a pro",
    description: "Professional free tools to test your mouse: CPS Test, Double Click Test, Tracking & Jitter and more.",
    siteName: "TestYourMouse",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TestYourMouse - Professional tools to test your mouse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TestYourMouse - Test your mouse like a pro",
    description: "Professional free tools to test your mouse: CPS Test, Double Click Test, Tracking & Jitter and more.",
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
    <html lang="en" className="dark">
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
