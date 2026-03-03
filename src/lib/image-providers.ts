// ===========================================
// Image Generation Providers Configuration
// ===========================================
// Multiple free API providers for image generation
// Supports automatic fallback between providers

export interface ImageProvider {
  name: string;
  enabled: boolean;
  priority: number;
  generate: (prompt: string) => Promise<string | null>;
  hasConfig: () => boolean;
}

// ===========================================
// Check which providers are configured
// ===========================================

function hasHuggingFaceConfig(): boolean {
  return !!(process.env.HUGGING_FACE_API_KEY || process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY);
}

function hasCloudflareConfig(): boolean {
  return !!(process.env.CLOUDFLARE_ACCOUNT_ID && process.env.CLOUDFLARE_API_TOKEN) ||
         !!(process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID && process.env.NEXT_PUBLIC_CLOUDFLARE_API_TOKEN);
}

function hasStabilityConfig(): boolean {
  return !!(process.env.STABILITY_API_KEY || process.env.NEXT_PUBLIC_STABILITY_API_KEY);
}

function hasReplicateConfig(): boolean {
  return !!(process.env.REPLICATE_API_KEY || process.env.NEXT_PUBLIC_REPLICATE_API_KEY);
}

function hasZAIConfig(): boolean {
  // Z.AI uses config file or env vars
  return !!(process.env.ZAI_BASE_URL && process.env.ZAI_API_KEY);
}

// ===========================================
// HUGGING FACE - FREE TIER
// ===========================================

async function generateWithHuggingFace(prompt: string): Promise<string | null> {
  if (!hasHuggingFaceConfig()) {
    return null;
  }

  const apiKey = process.env.HUGGING_FACE_API_KEY || process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    const response = await fetch(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            negative_prompt: 'blurry, bad quality, watermark',
            width: 1344,
            height: 768,
          },
        }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.log(`Hugging Face error: ${response.status}`);
      return null;
    }

    const imageBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(imageBuffer).toString('base64');
    return `data:image/png;base64,${base64}`;
    
  } catch (error) {
    console.error('Hugging Face error:', error);
    return null;
  }
}

// ===========================================
// CLOUDFLARE WORKERS AI - FREE TIER
// ===========================================

async function generateWithCloudflare(prompt: string): Promise<string | null> {
  if (!hasCloudflareConfig()) {
    return null;
  }

  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN || process.env.NEXT_PUBLIC_CLOUDFLARE_API_TOKEN;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          negative_prompt: 'blurry, bad quality, watermark',
          width: 1344,
          height: 768,
        }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.log(`Cloudflare error: ${response.status}`);
      return null;
    }

    const result = await response.json();
    
    if (result.result?.image) {
      return `data:image/png;base64,${result.result.image}`;
    }
    
    return null;
    
  } catch (error) {
    console.error('Cloudflare error:', error);
    return null;
  }
}

// ===========================================
// STABILITY AI - FREE CREDITS
// ===========================================

async function generateWithStability(prompt: string): Promise<string | null> {
  if (!hasStabilityConfig()) {
    return null;
  }

  const apiKey = process.env.STABILITY_API_KEY || process.env.NEXT_PUBLIC_STABILITY_API_KEY;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    const response = await fetch(
      'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text_prompts: [
            { text: prompt, weight: 1 },
            { text: 'blurry, bad quality, watermark', weight: -1 },
          ],
          cfg_scale: 7,
          height: 768,
          width: 1344,
          steps: 30,
          samples: 1,
        }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.log(`Stability AI error: ${response.status}`);
      return null;
    }

    const result = await response.json();
    
    if (result.artifacts && result.artifacts[0]?.base64) {
      return `data:image/png;base64,${result.artifacts[0].base64}`;
    }
    
    return null;
    
  } catch (error) {
    console.error('Stability AI error:', error);
    return null;
  }
}

// ===========================================
// REPLICATE - FREE CREDITS
// ===========================================

async function generateWithReplicate(prompt: string): Promise<string | null> {
  if (!hasReplicateConfig()) {
    return null;
  }

  const apiKey = process.env.REPLICATE_API_KEY || process.env.NEXT_PUBLIC_REPLICATE_API_KEY;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const startResponse = await fetch(
      'https://api.replicate.com/v1/predictions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Token ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          version: 'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
          input: {
            prompt: prompt,
            width: 1344,
            height: 768,
          },
        }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!startResponse.ok) {
      console.log(`Replicate error: ${startResponse.status}`);
      return null;
    }

    const prediction = await startResponse.json();
    
    // Poll for result (max 30 seconds)
    let result = prediction;
    let attempts = 0;

    while (result.status !== 'succeeded' && result.status !== 'failed' && attempts < 15) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const pollResponse = await fetch(
        `https://api.replicate.com/v1/predictions/${prediction.id}`,
        {
          headers: { 'Authorization': `Token ${apiKey}` },
        }
      );
      
      if (!pollResponse.ok) break;
      result = await pollResponse.json();
      attempts++;
    }

    if (result.status === 'succeeded' && result.output?.[0]) {
      const imageResponse = await fetch(result.output[0]);
      const imageBuffer = await imageResponse.arrayBuffer();
      const base64 = Buffer.from(imageBuffer).toString('base64');
      return `data:image/png;base64,${base64}`;
    }
    
    return null;
    
  } catch (error) {
    console.error('Replicate error:', error);
    return null;
  }
}

// ===========================================
// PLACEHOLDER GENERATOR (Always works)
// ===========================================

async function generatePlaceholder(title: string): Promise<string> {
  const colors = [
    ['#667eea', '#764ba2'],
    ['#f093fb', '#f5576c'],
    ['#4facfe', '#00f2fe'],
    ['#43e97b', '#38f9d7'],
    ['#fa709a', '#fee140'],
    ['#a8edea', '#fed6e3'],
  ];
  
  const randomColors = colors[Math.floor(Math.random() * colors.length)];
  const displayTitle = (title || 'Thumbnail').slice(0, 30);
  
  // Try to get placeholder from placehold.co
  try {
    const placeholderUrl = `https://placehold.co/1344x768/${randomColors[0].replace('#', '')}/${randomColors[1].replace('#', '')}?text=${encodeURIComponent(displayTitle)}&font=roboto`;
    
    const response = await fetch(placeholderUrl, { 
      signal: AbortSignal.timeout(5000) 
    });
    
    if (response.ok) {
      const imageBuffer = await response.arrayBuffer();
      const base64 = Buffer.from(imageBuffer).toString('base64');
      return `data:image/png;base64,${base64}`;
    }
  } catch (e) {
    console.log('Placeholder service unavailable, using SVG');
  }

  // Fallback to SVG
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1344" height="768" viewBox="0 0 1344 768">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${randomColors[0]};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${randomColors[1]};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="64" fill="white" text-anchor="middle" font-weight="bold">${displayTitle}</text>
      <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.7)" text-anchor="middle">Demo Mode - Add API keys for real images</text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

// ===========================================
// PROVIDER REGISTRY
// ===========================================

export const imageProviders: ImageProvider[] = [
  {
    name: 'Cloudflare Workers AI',
    enabled: true,
    priority: 1,
    generate: generateWithCloudflare,
    hasConfig: hasCloudflareConfig,
  },
  {
    name: 'Hugging Face',
    enabled: true,
    priority: 2,
    generate: generateWithHuggingFace,
    hasConfig: hasHuggingFaceConfig,
  },
  {
    name: 'Stability AI',
    enabled: true,
    priority: 3,
    generate: generateWithStability,
    hasConfig: hasStabilityConfig,
  },
  {
    name: 'Replicate',
    enabled: true,
    priority: 4,
    generate: generateWithReplicate,
    hasConfig: hasReplicateConfig,
  },
];

// ===========================================
// MAIN GENERATION FUNCTION
// ===========================================

export async function generateImageWithFallback(prompt: string, title: string): Promise<{
  image: string;
  provider: string;
  success: boolean;
}> {
  // Filter only providers that have configuration
  const configuredProviders = imageProviders
    .filter(p => p.enabled && p.hasConfig())
    .sort((a, b) => a.priority - b.priority);

  console.log(`Configured providers: ${configuredProviders.map(p => p.name).join(', ') || 'None'}`);

  // If no providers configured, go straight to placeholder
  if (configuredProviders.length === 0) {
    console.log('No providers configured, generating placeholder');
    const placeholderImage = await generatePlaceholder(title);
    return {
      image: placeholderImage,
      provider: 'Demo Mode',
      success: true, // Return true so UI shows the placeholder
    };
  }

  // Try each configured provider
  for (const provider of configuredProviders) {
    console.log(`Trying provider: ${provider.name}`);
    
    try {
      const image = await provider.generate(prompt);
      
      if (image) {
        console.log(`Success with provider: ${provider.name}`);
        return {
          image,
          provider: provider.name,
          success: true,
        };
      }
    } catch (error) {
      console.error(`Provider ${provider.name} failed:`, error);
    }
  }

  // All providers failed, generate placeholder
  console.log('All providers failed, generating placeholder');
  const placeholderImage = await generatePlaceholder(title);
  
  return {
    image: placeholderImage,
    provider: 'Fallback',
    success: true,
  };
}

// ===========================================
// PROVIDER STATUS CHECK
// ===========================================

export async function checkProvidersStatus(): Promise<Record<string, boolean>> {
  return {
    'Cloudflare Workers AI': hasCloudflareConfig(),
    'Hugging Face': hasHuggingFaceConfig(),
    'Stability AI': hasStabilityConfig(),
    'Replicate': hasReplicateConfig(),
  };
}

// ===========================================
// Get list of configured providers
// ===========================================

export function getConfiguredProviders(): string[] {
  return imageProviders
    .filter(p => p.hasConfig())
    .map(p => p.name);
}
