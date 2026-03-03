// ===========================================
// Image Generation Providers Configuration
// ===========================================
// Multiple free API providers for image generation
// Supports automatic fallback between providers

export interface ImageProvider {
  name: string;
  enabled: boolean;
  priority: number; // Lower = higher priority
  generate: (prompt: string) => Promise<string | null>;
  checkStatus?: () => Promise<boolean>;
}

// ===========================================
// HUGGING FACE - FREE TIER
// ===========================================
// Free API for image generation
// No credit card required
// Limits: ~30 images/day for free tier
// ===========================================

async function generateWithHuggingFace(prompt: string): Promise<string | null> {
  const apiKey = process.env.HUGGING_FACE_API_KEY || process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY;
  
  if (!apiKey) {
    console.log('Hugging Face: No API key configured');
    return null;
  }

  try {
    // Using Stable Diffusion XL model (free tier available)
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
            negative_prompt: 'blurry, bad quality, distorted, ugly, watermark, text overlay, signature',
            num_inference_steps: 30,
            guidance_scale: 7.5,
            width: 1344,
            height: 768,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.log(`Hugging Face error: ${response.status} - ${error}`);
      
      // Model loading, retry later
      if (response.status === 503) {
        console.log('Hugging Face: Model loading, will retry...');
      }
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
// Free: 10,000 images/month
// No credit card required
// Works globally with low latency
// ===========================================

async function generateWithCloudflare(prompt: string): Promise<string | null> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN || process.env.NEXT_PUBLIC_CLOUDFLARE_API_TOKEN;
  
  if (!accountId || !apiToken) {
    console.log('Cloudflare: Not configured');
    return null;
  }

  try {
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
          negative_prompt: 'blurry, bad quality, distorted, watermark',
          width: 1344,
          height: 768,
          num_steps: 20,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.log(`Cloudflare error: ${response.status} - ${error}`);
      return null;
    }

    const result = await response.json();
    
    if (result.result?.image) {
      // Cloudflare returns base64 directly
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
// Free credits on signup (150 images)
// High quality generation
// Requires API key from platform.stability.ai
// ===========================================

async function generateWithStability(prompt: string): Promise<string | null> {
  const apiKey = process.env.STABILITY_API_KEY || process.env.NEXT_PUBLIC_STABILITY_API_KEY;
  
  if (!apiKey) {
    console.log('Stability AI: No API key configured');
    return null;
  }

  try {
    const response = await fetch(
      'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          text_prompts: [
            { text: prompt, weight: 1 },
            { text: 'blurry, bad quality, distorted, watermark, signature', weight: -1 },
          ],
          cfg_scale: 7,
          height: 768,
          width: 1344,
          steps: 30,
          samples: 1,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.log(`Stability AI error: ${response.status} - ${error}`);
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
// Free credits on signup (~50 images)
// Access to multiple models
// Requires API key from replicate.com
// ===========================================

async function generateWithReplicate(prompt: string): Promise<string | null> {
  const apiKey = process.env.REPLICATE_API_KEY || process.env.NEXT_PUBLIC_REPLICATE_API_KEY;
  
  if (!apiKey) {
    console.log('Replicate: No API key configured');
    return null;
  }

  try {
    // Start prediction
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
            negative_prompt: 'blurry, bad quality, distorted, watermark',
            width: 1344,
            height: 768,
            num_inference_steps: 25,
          },
        }),
      }
    );

    if (!startResponse.ok) {
      const error = await startResponse.text();
      console.log(`Replicate start error: ${startResponse.status} - ${error}`);
      return null;
    }

    const prediction = await startResponse.json();
    
    // Poll for result (max 60 seconds)
    let result = prediction;
    let attempts = 0;
    const maxAttempts = 30;

    while (result.status !== 'succeeded' && result.status !== 'failed' && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const pollResponse = await fetch(
        `https://api.replicate.com/v1/predictions/${prediction.id}`,
        {
          headers: {
            'Authorization': `Token ${apiKey}`,
          },
        }
      );
      
      if (!pollResponse.ok) break;
      result = await pollResponse.json();
      attempts++;
    }

    if (result.status === 'succeeded' && result.output?.[0]) {
      // Replicate returns a URL, we need to fetch and convert to base64
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
// Z.AI (Original) - For local/development
// ===========================================

async function generateWithZAI(prompt: string): Promise<string | null> {
  try {
    const ZAI = (await import('z-ai-web-dev-sdk')).default;
    const zai = await ZAI.create();
    
    const response = await zai.images.generations.create({
      prompt,
      size: '1344x768',
    });

    const imageBase64 = response.data[0]?.base64;
    
    if (imageBase64) {
      return `data:image/png;base64,${imageBase64}`;
    }
    
    return null;
    
  } catch (error) {
    console.error('Z.AI error:', error);
    return null;
  }
}

// ===========================================
// FALLBACK: Placeholder Image Generator
// ===========================================
// When no API is available, generate a placeholder
// This ensures the app always works
// ===========================================

async function generatePlaceholder(prompt: string, title: string): Promise<string> {
  // Create a canvas-like SVG placeholder with the title
  const colors = [
    ['#667eea', '#764ba2'],
    ['#f093fb', '#f5576c'],
    ['#4facfe', '#00f2fe'],
    ['#43e97b', '#38f9d7'],
    ['#fa709a', '#fee140'],
    ['#a8edea', '#fed6e3'],
  ];
  
  const randomColors = colors[Math.floor(Math.random() * colors.length)];
  const encodedTitle = encodeURIComponent(title || 'Thumbnail');
  
  // Use a free placeholder service with custom text
  const placeholderUrl = `https://placehold.co/1344x768/${randomColors[0].replace('#', '')}/${randomColors[1].replace('#', '')}?text=${encodedTitle}&font=roboto`;
  
  try {
    const response = await fetch(placeholderUrl);
    const imageBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(imageBuffer).toString('base64');
    return `data:image/png;base64,${base64}`;
  } catch {
    // Return a data URL for a simple SVG
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1344" height="768">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${randomColors[0]};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${randomColors[1]};stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
        <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="48" fill="white" text-anchor="middle" font-weight="bold">${title || 'Thumbnail'}</text>
        <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.8)" text-anchor="middle">Configure API keys to generate real images</text>
      </svg>
    `;
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  }
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
  },
  {
    name: 'Hugging Face',
    enabled: true,
    priority: 2,
    generate: generateWithHuggingFace,
  },
  {
    name: 'Stability AI',
    enabled: true,
    priority: 3,
    generate: generateWithStability,
  },
  {
    name: 'Replicate',
    enabled: true,
    priority: 4,
    generate: generateWithReplicate,
  },
  {
    name: 'Z.AI',
    enabled: true,
    priority: 5,
    generate: generateWithZAI,
  },
];

// ===========================================
// HYBRID GENERATION FUNCTION
// ===========================================

export async function generateImageWithFallback(prompt: string, title: string): Promise<{
  image: string;
  provider: string;
  success: boolean;
}> {
  // Sort providers by priority
  const sortedProviders = [...imageProviders]
    .filter(p => p.enabled)
    .sort((a, b) => a.priority - b.priority);

  // Try each provider in order
  for (const provider of sortedProviders) {
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

  // If all providers fail, generate a placeholder
  console.log('All providers failed, generating placeholder');
  const placeholderImage = await generatePlaceholder(prompt, title);
  
  return {
    image: placeholderImage,
    provider: 'Placeholder',
    success: false,
  };
}

// ===========================================
// PROVIDER STATUS CHECK
// ===========================================

export async function checkProvidersStatus(): Promise<Record<string, boolean>> {
  const status: Record<string, boolean> = {};
  
  // Check if API keys are configured
  status['Cloudflare Workers AI'] = !!(process.env.CLOUDFLARE_ACCOUNT_ID && process.env.CLOUDFLARE_API_TOKEN);
  status['Hugging Face'] = !!process.env.HUGGING_FACE_API_KEY;
  status['Stability AI'] = !!process.env.STABILITY_API_KEY;
  status['Replicate'] = !!process.env.REPLICATE_API_KEY;
  
  return status;
}
