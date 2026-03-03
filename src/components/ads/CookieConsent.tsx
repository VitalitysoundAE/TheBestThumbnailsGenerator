'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Cookie, Settings, X, Check, ExternalLink } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always true
  analytics: false,
  marketing: false,
  functional: false,
};

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a small delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Load existing preferences
      const savedPrefs = localStorage.getItem('cookie-preferences');
      if (savedPrefs) {
        setPreferences(JSON.parse(savedPrefs));
      }
    }
  }, []);

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    savePreferences(allAccepted);
    setShowBanner(false);
  };

  const rejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    savePreferences(onlyNecessary);
    setShowBanner(false);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', 'customized');
    localStorage.setItem('cookie-preferences', JSON.stringify(prefs));
    setPreferences(prefs);
    
    // Apply preferences (in a real app, this would enable/disable tracking scripts)
    applyPreferences(prefs);
  };

  const applyPreferences = (prefs: CookiePreferences) => {
    // This is where you would enable/disable various tracking scripts
    // For example:
    if (prefs.analytics) {
      // Enable Google Analytics
      console.log('Analytics cookies enabled');
    }
    if (prefs.marketing) {
      // Enable marketing cookies (ads, etc.)
      console.log('Marketing cookies enabled');
    }
    if (prefs.functional) {
      // Enable functional cookies
      console.log('Functional cookies enabled');
    }
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Can't toggle necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
    setShowSettings(false);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4">
      <Card className="max-w-4xl mx-auto bg-gray-900/95 backdrop-blur-xl border-white/10 shadow-2xl">
        {!showSettings ? (
          // Main Banner
          <div className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    We value your privacy
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. 
                    By clicking "Accept All", you consent to our use of cookies. 
                    <a href="/privacy" className="text-purple-400 hover:text-purple-300 ml-1 underline">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={rejectAll}
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  Reject All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSettings(true)}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Customize
                </Button>
                <Button
                  size="sm"
                  onClick={acceptAll}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Settings Panel
          <div className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Cookie Preferences</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(false)}
                className="text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {/* Necessary Cookies */}
              <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-white">Necessary Cookies</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">Always Active</span>
                  </div>
                  <p className="text-sm text-white/60">
                    Essential for the website to function properly. Cannot be disabled.
                  </p>
                </div>
                <div className="w-12 h-6 rounded-full bg-green-500 flex items-center justify-end px-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
              
              {/* Analytics Cookies */}
              <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex-1">
                  <h4 className="font-medium text-white mb-1">Analytics Cookies</h4>
                  <p className="text-sm text-white/60">
                    Help us understand how visitors interact with our website.
                  </p>
                </div>
                <button
                  onClick={() => togglePreference('analytics')}
                  className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                    preferences.analytics ? 'bg-purple-500 justify-end' : 'bg-gray-600 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white" />
                </button>
              </div>
              
              {/* Marketing Cookies */}
              <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex-1">
                  <h4 className="font-medium text-white mb-1">Marketing Cookies</h4>
                  <p className="text-sm text-white/60">
                    Used to deliver relevant ads and track campaign performance.
                  </p>
                </div>
                <button
                  onClick={() => togglePreference('marketing')}
                  className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                    preferences.marketing ? 'bg-purple-500 justify-end' : 'bg-gray-600 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white" />
                </button>
              </div>
              
              {/* Functional Cookies */}
              <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex-1">
                  <h4 className="font-medium text-white mb-1">Functional Cookies</h4>
                  <p className="text-sm text-white/60">
                    Enable enhanced functionality and personalization.
                  </p>
                </div>
                <button
                  onClick={() => togglePreference('functional')}
                  className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                    preferences.functional ? 'bg-purple-500 justify-end' : 'bg-gray-600 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white" />
                </button>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(false)}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={saveCustomPreferences}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                Save Preferences
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

// Floating cookie settings button for footer
export function CookieSettingsButton() {
  const [showSettings, setShowSettings] = useState(false);

  const openSettings = () => {
    // Clear consent to show banner again
    localStorage.removeItem('cookie-consent');
    window.location.reload();
  };

  return (
    <button
      onClick={openSettings}
      className="text-sm text-white/50 hover:text-white/80 transition-colors flex items-center gap-1"
    >
      <Cookie className="w-4 h-4" />
      Cookie Settings
    </button>
  );
}
