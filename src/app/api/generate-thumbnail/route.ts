import { NextRequest, NextResponse } from 'next/server';
import { generateImageWithFallback, checkProvidersStatus, getConfiguredProviders } from '@/lib/image-providers';

// Configure runtime for Vercel (allows up to 60 seconds)
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

interface GenerateRequest {
  title: string;
  description?: string;
  style: string;
  isPro: boolean;
  background?: string;
  colors?: string[];
  font?: string;
  fontSize?: string;
  character?: {
    type?: string;
    expression?: string;
    pose?: string;
  };
}

function buildPrompt(data: GenerateRequest): string {
  const { title, description, style, isPro, background, colors, font, character } = data;

  let prompt = `YouTube thumbnail with main text "${title}". `;

  if (description?.trim()) {
    prompt += `${description}. `;
  }

  const styleDescriptions: Record<string, string> = {
    dramatic: 'dramatic lighting, bold contrast, cinematic',
    minimalist: 'clean minimalist design, simple, modern',
    explosive: 'explosive dynamic energy, motion blur, powerful',
    professional: 'professional corporate look, polished, clean',
    neon: 'vibrant neon glowing effects, cyberpunk, electric',
    cinematic: 'cinematic movie-like, film grain, epic',
    gaming: 'epic gaming aesthetic with RGB lighting, esports',
    retro: 'vintage retro aesthetic, 80s inspired',
    tech: 'futuristic technology, holographic, circuit patterns',
    cartoon: 'cartoon animated style, playful, vibrant',
    horror: 'dark horror theme, scary atmosphere, shadows',
    anime: 'Japanese anime art style, manga inspired',
    vintage: 'classic vintage aged look, sepia tones',
    graffiti: 'urban street art graffiti style, spray paint',
    scifi: 'science fiction futuristic, space elements',
    popart: 'bold pop art style, comic book inspired',
    darkmode: 'sleek dark mode aesthetic, dark with bright accents',
    pastel: 'soft pastel colors, dreamy and gentle',
    cyberpunk: 'cyberpunk neon noir, rainy city lights',
    handdrawn: 'hand drawn artistic sketch style',
    '3d': '3D rendered graphics, realistic depth',
    watercolor: 'soft watercolor painted look',
  };

  prompt += `Style: ${styleDescriptions[style] || style}. `;

  if (isPro) {
    if (background) {
      prompt += `Background: ${background}. `;
    }

    if (colors?.length) {
      prompt += `Colors: ${colors.join(', ')}. `;
    }

    if (font) {
      prompt += `Typography: ${font} style. `;
    }

    if (character?.type) {
      prompt += `Include a ${character.type} character`;
      if (character.expression) prompt += ` with ${character.expression} expression`;
      if (character.pose) prompt += ` in ${character.pose} pose`;
      prompt += '. ';
    }
  }

  prompt += `High quality, 16:9 aspect ratio, eye-catching. Text "${title}" must be clearly visible. No watermarks.`;

  return prompt;
}

export async function POST(request: NextRequest) {
  try {
    const data: GenerateRequest = await request.json();

    if (!data.title || !data.style) {
      return NextResponse.json(
        { success: false, error: 'Title and style are required' },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(data);
    console.log('Generated prompt:', prompt.slice(0, 150) + '...');

    // Check configured providers
    const configured = getConfiguredProviders();
    console.log('Configured providers:', configured.length > 0 ? configured.join(', ') : 'None - using demo mode');

    // Generate image with fallback
    const result = await generateImageWithFallback(prompt, data.title);

    return NextResponse.json({
      success: result.success,
      image: result.image,
      prompt,
      provider: result.provider,
      configuredProviders: configured,
    });

  } catch (error) {
    console.error('Error generating thumbnail:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to generate thumbnail' 
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check provider status
export async function GET() {
  const status = await checkProvidersStatus();
  const configured = getConfiguredProviders();
  
  return NextResponse.json({ 
    providers: status,
    configuredProviders: configured,
    hasAnyProvider: configured.length > 0,
  });
}
