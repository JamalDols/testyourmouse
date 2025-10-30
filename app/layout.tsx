import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ProProvider } from "@/components/ProContext";
import { Toaster } from "@/components/ui/sonner";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TestYourMouse - Testea tu ratón como un pro",
  description: "Herramientas gratuitas para testear tu ratón: CPS Test, Double Click Test, Tracking & Jitter, y más.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className={jetbrainsMono.className}>
        <ProProvider>
          {children}
          <Toaster />
        </ProProvider>
      </body>
    </html>
  );
}
