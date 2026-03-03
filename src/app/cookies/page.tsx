'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Cookie } from 'lucide-react';

export default function CookiesPage() {
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
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <Cookie className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Cookie Policy</h1>
            <p className="text-white/50">Last updated: January 2025</p>
          </div>
        </div>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <div className="p-8 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">What Are Cookies?</h2>
              <p className="text-white/70 leading-relaxed">
                Cookies are small text files that are stored on your device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences and 
                understanding how you use our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Types of Cookies We Use</h2>
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-semibold text-white mb-2">1. Necessary Cookies</h3>
                  <p className="text-white/70 text-sm">
                    These cookies are essential for the website to function properly. They enable basic 
                    functions like page navigation and access to secure areas. The website cannot function 
                    properly without these cookies.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-semibold text-white mb-2">2. Analytics Cookies</h3>
                  <p className="text-white/70 text-sm">
                    These cookies help us understand how visitors interact with our website by collecting 
                    and reporting information anonymously. This helps us improve our service.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-semibold text-white mb-2">3. Marketing Cookies</h3>
                  <p className="text-white/70 text-sm">
                    These cookies are used to track visitors across websites. The intention is to display 
                    ads that are relevant and engaging for the individual user.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-semibold text-white mb-2">4. Functional Cookies</h3>
                  <p className="text-white/70 text-sm">
                    These cookies enable enhanced functionality and personalization, such as remembering 
                    your preferences and settings.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Managing Your Cookie Preferences</h2>
              <p className="text-white/70 leading-relaxed">
                When you first visit our website, you will be presented with a cookie consent banner where 
                you can choose which types of cookies you would like to accept. You can change your 
                preferences at any time by clicking the "Cookie Settings" link in the footer.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Third-Party Cookies</h2>
              <p className="text-white/70 leading-relaxed">
                We may use third-party services that set their own cookies, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4 text-white/70">
                <li><strong className="text-white">Google Analytics:</strong> For website analytics</li>
                <li><strong className="text-white">Google AdSense:</strong> For displaying advertisements</li>
                <li><strong className="text-white">Cloudflare:</strong> For security and performance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Browser Controls</h2>
              <p className="text-white/70 leading-relaxed">
                Most browsers allow you to control cookies through their settings. You can typically:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4 text-white/70">
                <li>View cookies stored on your device</li>
                <li>Accept or reject cookies</li>
                <li>Delete all or specific cookies</li>
                <li>Block third-party cookies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
              <p className="text-white/70 leading-relaxed">
                If you have questions about our use of cookies, contact us at: 
                <span className="text-purple-400"> privacy@thumbnailgenerator.ai</span>
              </p>
            </section>
          </div>
        </Card>

        <div className="flex gap-4 mt-8">
          <Link href="/privacy">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Privacy Policy
            </Button>
          </Link>
          <Link href="/terms">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Terms of Service
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
