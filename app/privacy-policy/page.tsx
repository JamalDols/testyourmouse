import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Shield, Cookie, Eye, Lock, Mail, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy - TestYourMouse",
  description: "Learn about how TestYourMouse collects, uses, and protects your personal information and data.",
  alternates: {
    canonical: "https://testyourmouse.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy - TestYourMouse",
    description: "Learn about how TestYourMouse collects, uses, and protects your personal information and data.",
    url: "https://testyourmouse.com/privacy-policy",
    type: "website",
    images: [
      {
        url: "https://testyourmouse.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "TestYourMouse - Privacy Policy",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
            <Shield className="w-12 h-12 text-cyan-400" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-cyan-400">Privacy Policy</h1>
        <p className="text-gray-400 flex items-center justify-center gap-2">
          <Calendar className="w-4 h-4" />
          Last updated: October 30, 2025
        </p>
      </div>

      {/* Introduction */}
      <Card className="p-6 bg-[#12121a] border-cyan-500/30">
        <p className="text-gray-300 leading-relaxed">
          At TestYourMouse, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this
          privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
        </p>
      </Card>

      {/* Information We Collect */}
      <Card className="p-6 bg-[#12121a] border-cyan-500/30 space-y-4">
        <div className="flex items-center gap-3">
          <Eye className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-semibold text-cyan-400">Information We Collect</h2>
        </div>

        <div className="space-y-4 text-gray-300">
          <div>
            <h3 className="text-lg font-semibold text-cyan-400/90 mb-2">Automatically Collected Information</h3>
            <p className="text-sm leading-relaxed mb-2">When you visit our website, we automatically collect certain information about your device, including:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400 ml-4">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>IP address</li>
              <li>Pages visited and time spent on pages</li>
              <li>Mouse movement data (for testing purposes only, not stored)</li>
              <li>Click patterns (processed locally, not transmitted)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-cyan-400/90 mb-2">Cookies and Tracking Technologies</h3>
            <p className="text-sm leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data which may include an
              anonymous unique identifier.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-cyan-400/90 mb-2">Test Data</h3>
            <p className="text-sm leading-relaxed">
              All mouse testing data (clicks, movements, scroll events) is processed entirely in your browser and is NOT sent to our servers or stored anywhere. Your test results remain completely
              private.
            </p>
          </div>
        </div>
      </Card>

      {/* How We Use Your Information */}
      <Card className="p-6 bg-[#12121a] border-cyan-500/30 space-y-4">
        <div className="flex items-center gap-3">
          <Cookie className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-semibold text-cyan-400">How We Use Your Information</h2>
        </div>

        <div className="space-y-2 text-sm text-gray-300">
          <p>We use the information we collect to:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
            <li>Operate and maintain our website</li>
            <li>Improve user experience and website performance</li>
            <li>Analyze usage patterns and trends</li>
            <li>Monitor and prevent technical issues</li>
            <li>Understand which features are most popular</li>
            <li>Comply with legal obligations</li>
          </ul>
        </div>
      </Card>

      {/* Google Analytics and Tag Manager */}
      <Card className="p-6 bg-[#12121a] border-cyan-500/30 space-y-4">
        <div className="flex items-center gap-3">
          <Eye className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-semibold text-cyan-400">Google Analytics & Tag Manager</h2>
        </div>

        <div className="space-y-3 text-sm text-gray-300">
          <p>We use Google Analytics and Google Tag Manager to help us understand how visitors use our website. These services use cookies to collect information such as:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
            <li>How often users visit the site</li>
            <li>What pages they visit and for how long</li>
            <li>What site referred them to us</li>
            <li>General demographic information</li>
          </ul>
          <p>Google Analytics does NOT collect personal information such as your name or email address. The information is used solely to improve our website and services.</p>
          <p className="text-cyan-400/80">
            You can opt-out of Google Analytics by installing the{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-300">
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </p>
        </div>
      </Card>

      {/* Data Security */}
      <Card className="p-6 bg-[#12121a] border-cyan-500/30 space-y-4">
        <div className="flex items-center gap-3">
          <Lock className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-semibold text-cyan-400">Data Security</h2>
        </div>

        <p className="text-sm text-gray-300 leading-relaxed">
          We implement appropriate technical and organizational security measures to protect your information. However, please note that no method of transmission over the Internet or electronic
          storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
        </p>
      </Card>

      {/* Your Rights */}
      <Card className="p-6 bg-[#12121a] border-cyan-500/30 space-y-4">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-semibold text-cyan-400">Your Privacy Rights</h2>
        </div>

        <div className="space-y-2 text-sm text-gray-300">
          <p>Depending on your location, you may have the following rights:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to processing of your information</li>
            <li>Withdraw consent for cookie usage</li>
          </ul>
          <p className="text-cyan-400/80 mt-3">
            To manage your cookie preferences, you can clear your browser cookies or adjust your cookie consent at any time by clearing your browser's local storage.
          </p>
        </div>
      </Card>

      {/* Third-Party Services */}
      <Card className="p-6 bg-[#12121a] border-cyan-500/30 space-y-4">
        <h2 className="text-2xl font-semibold text-cyan-400">Third-Party Services</h2>

        <div className="space-y-2 text-sm text-gray-300">
          <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies.</p>
          <p className="mt-3">Third-party services we use:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
            <li>Google Analytics (analytics and reporting)</li>
            <li>Google Tag Manager (tag management)</li>
            <li>Vercel (hosting and CDN)</li>
          </ul>
        </div>
      </Card>

      {/* Children's Privacy */}
      <Card className="p-6 bg-[#12121a] border-cyan-500/30 space-y-4">
        <h2 className="text-2xl font-semibold text-cyan-400">Children's Privacy</h2>

        <p className="text-sm text-gray-300 leading-relaxed">
          Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child
          has provided us with personal information, please contact us.
        </p>
      </Card>

      {/* Changes to Privacy Policy */}
      <Card className="p-6 bg-[#12121a] border-cyan-500/30 space-y-4">
        <h2 className="text-2xl font-semibold text-cyan-400">Changes to This Privacy Policy</h2>

        <p className="text-sm text-gray-300 leading-relaxed">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to
          review this Privacy Policy periodically for any changes.
        </p>
      </Card>

      {/* Contact */}
      <Card className="p-6 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border-cyan-500/30 space-y-4">
        <div className="flex items-center gap-3">
          <Mail className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-semibold text-cyan-400">Contact Us</h2>
        </div>

        <p className="text-sm text-gray-300 leading-relaxed">If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
        <div className="text-sm text-cyan-400 space-y-1">
          <p>
            Email:{" "}
            <a href="mailto:privacy@testyourmouse.com" className="underline hover:text-cyan-300">
              privacy@testyourmouse.com
            </a>
          </p>
          <p>
            Website:{" "}
            <a href="https://testyourmouse.com" className="underline hover:text-cyan-300">
              https://testyourmouse.com
            </a>
          </p>
        </div>
      </Card>

      {/* Acceptance */}
      <Card className="p-6 bg-[#12121a] border-cyan-500/30">
        <p className="text-sm text-gray-300 leading-relaxed text-center">By using TestYourMouse, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.</p>
      </Card>
    </div>
  );
}
