import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ProProvider } from "@/components/ProContext";
import { Toaster } from "@/components/ui/sonner";
import { CookieConsent } from "@/components/CookieConsent";
import { NavLink } from "@/components/NavLink";
import { DonationButton } from "@/components/DonationButton";
import { Mouse } from "lucide-react";
import { Analytics } from "@vercel/analytics/next";

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
        url: "/opengraph-image",
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
    images: ["/opengraph-image"],
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
          <div className="min-h-screen">
            {/* Header */}
            <header className="border-b border-cyan-500/20 sticky top-0 z-50 backdrop-blur-sm bg-background/80" role="banner">
              <div className="max-w-7xl mx-auto px-4 py-6">
                <Link href="/" className="flex items-center gap-3 mb-2 hover:opacity-80 transition-opacity w-fit">
                  <Mouse className="w-8 h-8 text-cyan-400" aria-hidden="true" />
                  <h1 className="text-3xl font-medium tracking-wider text-cyan-400">TestYourMouse</h1>
                </Link>
                <p className="text-cyan-400/70 text-sm">Test your mouse like a pro</p>
              </div>

              {/* Navigation */}
              <nav className="border-t border-cyan-500/20" role="navigation" aria-label="Main navigation">
                <div className="max-w-7xl mx-auto px-4">
                  <ul className="flex flex-wrap gap-2 py-3 justify-center">
                    <li>
                      <NavLink href="/">Home</NavLink>
                    </li>
                    <li>
                      <NavLink href="/click-visualizer">Click Visualizer</NavLink>
                    </li>
                    <li>
                      <NavLink href="/double-click">Double Click Test</NavLink>
                    </li>
                    <li>
                      <NavLink href="/cps-test">CPS Test</NavLink>
                    </li>
                    <li>
                      <NavLink href="/scroll-test">Scroll Test</NavLink>
                    </li>
                    <li>
                      <NavLink href="/tracking-jitter">Tracking & Jitter</NavLink>
                    </li>
                    <li>
                      <NavLink href="/pro-tools" isPro>
                        Pro Tools
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </nav>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8" role="main">
              {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-cyan-500/20 mt-16 py-8" role="contentinfo">
              <div className="max-w-7xl mx-auto px-4 text-center text-sm text-cyan-400/50">
                <p>© 2025 TestYourMouse.com • Made with ❤️ for gamers and tech enthusiasts</p>
              </div>
            </footer>

            {/* Buy Me a Coffee Button */}
            <DonationButton />

            {/* Cookie Consent Banner */}
            <CookieConsent />
          </div>
          <Toaster />
        </ProProvider>
        <Analytics />
      </body>
    </html>
  );
}
