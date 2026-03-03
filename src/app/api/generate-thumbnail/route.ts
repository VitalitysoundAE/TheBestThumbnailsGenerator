import { NextRequest, NextResponse } from 'next/server';
import { generateImageWithFallback, checkProvidersStatus } from '@/lib/image-providers';

// Configure runtime for Vercel (allows up to 60 seconds)
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

interface GenerateRequest {
  title: string;
  description?: string;
  style: string;
  isPro: boolean;
  background?: string;
  backgroundCategory?: string;
  colors?: string[];
  blendMode?: string;
  font?: string;
  fontSize?: string;
  format?: string;
  formatConfig?: Record<string, string>;
  character?: {
    type?: string;
    gender?: string;
    age?: string;
    pose?: string;
    expression?: string;
    outfit?: string;
    accessories?: string;
    hairStyle?: string;
    hairColor?: string;
  };
}

function buildPrompt(data: GenerateRequest): string {
  const { 
    title, 
    description, 
    style, 
    isPro, 
    background, 
    colors, 
    font, 
    fontSize, 
    format, 
    formatConfig,
    character 
  } = data;

  // Start with the exact title - this is CRITICAL
  let prompt = `Create a YouTube thumbnail image. The main text in the thumbnail must say EXACTLY: "${title}". `;
  prompt += `Do not change, modify, or translate this text. It must appear exactly as written. `;

  // Add user description if provided
  if (description && description.trim()) {
    prompt += `Description of desired thumbnail: ${description}. `;
  }

  // Add style description
  const styleDescriptions: Record<string, string> = {
    dramatic: 'dramatic lighting with bold contrast, intense emotions, cinematic shadows, high impact visual',
    minimalist: 'clean minimalist design with lots of negative space, simple composition, modern and elegant',
    explosive: 'explosive dynamic energy with motion blur, particles, dramatic action feel, powerful impact',
    professional: 'professional corporate look, polished business aesthetic, clean and trustworthy',
    neon: 'vibrant neon glowing effects, cyberpunk inspired, electric colors, futuristic nightlife feel',
    cinematic: 'cinematic movie-like atmosphere, film grain, dramatic lighting, epic storytelling composition',
    gaming: 'epic gaming aesthetic with RGB lighting, controller or gaming elements, esports style, dynamic',
    retro: 'vintage retro aesthetic, nostalgic feel, old school design, 80s or 90s inspired colors',
    tech: 'futuristic technology theme, holographic elements, circuit patterns, advanced tech feel',
    cartoon: 'cartoon animated style, fun and playful, vibrant colors, exaggerated expressions',
    horror: 'dark horror theme, scary atmosphere, shadows and mist, spooky eerie feeling',
    anime: 'Japanese anime art style, manga inspired, expressive characters, dynamic poses',
    vintage: 'classic vintage aged look, sepia tones, old photograph feel, nostalgic warmth',
    graffiti: 'urban street art graffiti style, spray paint effects, bold colors, hip hop culture',
    scifi: 'science fiction futuristic theme, space elements, alien technology, otherworldly',
    popart: 'bold pop art style, comic book inspired, halftone dots, vibrant contrasting colors',
    darkmode: 'sleek dark mode aesthetic, dark background with bright accents, modern dark UI feel',
    pastel: 'soft pastel colors, dreamy and gentle atmosphere, light and airy composition',
    cyberpunk: 'cyberpunk neon noir aesthetic, rainy city lights, futuristic dystopia, blade runner vibes',
    handdrawn: 'hand drawn artistic sketch style, pencil or ink lines, artistic and organic feel',
    '3d': '3D rendered graphics, realistic depth and shadows, three-dimensional objects, CGI quality',
    watercolor: 'soft watercolor painted look, artistic brush strokes, gentle color blending, artistic',
  };

  prompt += `Overall visual style: ${styleDescriptions[style] || style}. `;

  // Pro features
  if (isPro) {
    // Background
    if (background) {
      const backgroundDescriptions: Record<string, string> = {
        'marble': 'elegant marble texture background',
        'wood': 'warm wooden texture background',
        'concrete': 'industrial concrete texture',
        'fabric': 'soft fabric texture',
        'paper': 'textured paper background',
        'metal': 'metallic texture',
        'brick': 'exposed brick wall',
        'leather': 'leather texture background',
        'sand': 'natural sand texture',
        'stone': 'natural stone texture',
        'sky': 'beautiful sky with clouds',
        'forest': 'lush forest background',
        'city': 'urban cityscape',
        'mountain': 'mountain landscape view',
        'ocean': 'ocean view with waves',
        'sunset': 'gorgeous sunset sky',
        'night': 'night sky with stars',
        'studio': 'professional studio lighting',
        'geometric': 'geometric patterns',
        'waves': 'stylized waves',
        'particles': 'floating particles',
        'solid-black': 'solid black background',
        'solid-white': 'solid white background',
        'gradient-purple': 'purple gradient',
        'gradient-blue': 'blue gradient',
        'gradient-pink': 'pink gradient',
        'gradient-green': 'green gradient',
        'gradient-orange': 'orange gradient',
        'gaming-setup': 'gaming setup with RGB',
        'money-stack': 'money stacks',
        'neon-city': 'neon city',
        'space-stars': 'space with stars',
      };
      prompt += `Background: ${backgroundDescriptions[background] || background}. `;
    }

    // Colors
    if (colors && colors.length > 0) {
      prompt += `Color scheme: ${colors.join(', ')}. `;
    }

    // Font
    if (font) {
      const fontDescriptions: Record<string, string> = {
        impact: 'bold Impact-style typography',
        bebas: 'Bebas Neue bold letters',
        oswald: 'Oswald condensed font',
        montserrat: 'Montserrat modern font',
        roboto: 'Roboto font',
        playfair: 'Playfair elegant font',
      };
      prompt += `Typography: ${fontDescriptions[font] || font}. `;
    }

    // Font Size
    if (fontSize) {
      const sizeDescriptions: Record<string, string> = {
        small: 'modest sized text',
        medium: 'medium sized text',
        large: 'large bold text',
      };
      prompt += `Text size: ${sizeDescriptions[fontSize]}. `;
    }

    // Character
    if (character && character.type) {
      const typeDescriptions: Record<string, string> = {
        'human-male': 'human male',
        'human-female': 'human female',
        'cartoon-male': 'cartoon male',
        'cartoon-female': 'cartoon female',
        'anime-male': 'anime male',
        'anime-female': 'anime female',
        'animal-dog': 'dog',
        'animal-cat': 'cat',
        'animal-other': 'animal',
        'child': 'child',
        'young-adult': 'young adult',
        'adult': 'adult',
        'senior': 'senior',
        'robot': 'robot',
        'alien': 'alien',
        'fantasy': 'fantasy character',
      };
      
      let charDesc = typeDescriptions[character.type] || character.type;
      if (character.expression) charDesc += ` with ${character.expression} expression`;
      if (character.pose) charDesc += ` in ${character.pose} pose`;
      
      prompt += `Include a ${charDesc}. `;
    }
  }

  // Final instructions
  prompt += `Create an eye-catching YouTube thumbnail (16:9 aspect ratio). The text "${title}" must be clearly visible and prominent. High quality, professional composition. No watermarks.`;

  return prompt;
}

export async function POST(request: NextRequest) {
  try {
    const data: GenerateRequest = await request.json();

    // Validate required fields
    if (!data.title || !data.style) {
      return NextResponse.json(
        { success: false, error: 'Title and style are required' },
        { status: 400 }
      );
    }

    // Build the prompt
    const prompt = buildPrompt(data);
    console.log('Generated prompt:', prompt.substring(0, 200) + '...');

    // Use hybrid generation with automatic fallback
    const result = await generateImageWithFallback(prompt, data.title);

    return NextResponse.json({
      success: result.success,
      image: result.image,
      prompt,
      provider: result.provider,
    });

  } catch (error) {
    console.error('Error generating thumbnail:', error);
    
    let errorMessage = 'Failed to generate thumbnail';
    
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// Endpoint to check provider status
export async function GET() {
  const status = await checkProvidersStatus();
  return NextResponse.json({ providers: status });
}
