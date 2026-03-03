'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost" className="text-white/70 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to App
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
            <p className="text-white/50">Last updated: January 2025</p>
          </div>
        </div>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <div className="p-8 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Introduction</h2>
              <p className="text-white/70 leading-relaxed">
                Welcome to Thumbnail Generator ("we," "our," or "us"). We are committed to protecting your privacy 
                and ensuring the security of your personal information. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our AI-powered YouTube thumbnail generation service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Information We Collect</h2>
              <div className="text-white/70 leading-relaxed space-y-4">
                <p><strong className="text-white">Information You Provide:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Video titles and descriptions you enter for thumbnail generation</li>
                  <li>Style preferences and customization options</li>
                  <li>Email address (if you choose to provide it for support or updates)</li>
                </ul>
                
                <p className="mt-4"><strong className="text-white">Automatically Collected Information:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Browser type and version</li>
                  <li>Device information (type, operating system)</li>
                  <li>IP address (anonymized)</li>
                  <li>Usage data and interaction with our service</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
              <div className="text-white/70 leading-relaxed">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                  <li>Generate thumbnails using AI technology</li>
                  <li>Improve and optimize our service</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Send you updates and marketing communications (with your consent)</li>
                  <li>Detect and prevent fraud or abuse</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Third-Party Services</h2>
              <p className="text-white/70 leading-relaxed">
                Our service uses the following third-party providers for AI image generation: Cloudflare Workers AI, 
                Hugging Face, Stability AI, and Replicate. These services process your prompts to generate images.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. Your Rights</h2>
              <p className="text-white/70 leading-relaxed">
                Under applicable data protection laws (GDPR, CCPA), you have the right to access, correct, delete, 
                and export your personal data. You may also object to processing and withdraw consent at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Contact Us</h2>
              <p className="text-white/70 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at: 
                <span className="text-purple-400"> privacy@thumbnailgenerator.ai</span>
              </p>
            </section>
          </div>
        </Card>

        <div className="flex gap-4 mt-8">
          <Link href="/terms">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Terms of Service
            </Button>
          </Link>
          <Link href="/cookies">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Cookie Policy
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
