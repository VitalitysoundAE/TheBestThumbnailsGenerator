'use client';

import { useState, useEffect } from 'react';

interface AdBannerProps {
  slot: 'header' | 'sidebar' | 'footer' | 'inline';
  className?: string;
}

// Ad configuration - easily configurable for different ad networks
const adConfig = {
  enabled: process.env.NEXT_PUBLIC_ADS_ENABLED === 'true',
  network: process.env.NEXT_PUBLIC_AD_NETWORK || 'adsense', // adsense, media.net, custom
  
  // Google AdSense
  adsense: {
    publisherId: process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || '',
    slots: {
      header: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER || '',
      sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR || '',
      footer: process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER || '',
      inline: process.env.NEXT_PUBLIC_ADSENSE_SLOT_INLINE || '',
    },
  },
};

export function AdBanner({ slot, className = '' }: AdBannerProps) {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    // Check if user has given consent
    const consentValue = localStorage.getItem('cookie-consent');
    if (consentValue === 'accepted') {
      setConsent(true);
    }
  }, []);

  // Don't show ads if consent not given or ads disabled
  if (!adConfig.enabled || !consent) {
    return (
      <div className={`ad-placeholder ad-slot-${slot} ${className}`}>
        <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg border border-white/10 text-white/30 text-sm p-4 text-center">
          <span className="opacity-60">Advertisement Space</span>
        </div>
      </div>
    );
  }

  // Different ad sizes based on slot
  const adSizes = {
    header: 'h-[90px] w-full max-w-[728px]',
    sidebar: 'h-[250px] w-full max-w-[300px]',
    footer: 'h-[90px] w-full max-w-[728px]',
    inline: 'h-[250px] w-full max-w-[336px]',
  };

  return (
    <div className={`ad-container ad-slot-${slot} ${adSizes[slot]} ${className}`}>
      {adConfig.network === 'adsense' && adConfig.adsense.publisherId && (
        <div className="h-full w-full bg-gray-800/30 rounded-lg flex items-center justify-center border border-white/10">
          {/* Google AdSense will be injected here */}
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={adConfig.adsense.publisherId}
            data-ad-slot={adConfig.adsense.slots[slot]}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      )}
      
      {adConfig.network === 'custom' && (
        <div className="h-full w-full bg-gray-800/30 rounded-lg flex items-center justify-center border border-white/10">
          {/* Custom ad code can be injected here */}
          <div className="text-white/50 text-sm">Custom Ad Space</div>
        </div>
      )}
    </div>
  );
}

// Native Ad - blends with content
export function NativeAd({ className = '' }: { className?: string }) {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    const consentValue = localStorage.getItem('cookie-consent');
    if (consentValue === 'accepted') {
      setConsent(true);
    }
  }, []);

  if (!adConfig.enabled || !consent) {
    return null;
  }

  return (
    <div className={`native-ad ${className}`}>
      <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-4 border border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-white/50 uppercase tracking-wider">Sponsored</span>
        </div>
        <div className="text-white/70 text-sm">
          <p>Discover the best tools for content creators!</p>
        </div>
      </div>
    </div>
  );
}
