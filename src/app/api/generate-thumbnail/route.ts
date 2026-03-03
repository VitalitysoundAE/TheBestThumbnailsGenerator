import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

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

// Retry utility with exponential backoff
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 2000
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      // Don't retry on client errors (4xx)
      if (lastError.message.includes('400') || lastError.message.includes('401') || lastError.message.includes('403')) {
        throw lastError;
      }
      
      if (attempt < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, attempt);
        console.log(`Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}

function buildPrompt(data: GenerateRequest): string {
  const { 
    title, 
    description, 
    style, 
    isPro, 
    background, 
    colors, 
    blendMode, 
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
        'abstract-nature': 'abstract nature background',
        'urban': 'urban street background',
        'geometric': 'geometric patterns',
        'waves': 'stylized waves',
        'particles': 'floating particles',
        'lines': 'abstract lines',
        'dots': 'polka dots pattern',
        'gradients': 'smooth gradient',
        'shapes': 'abstract shapes',
        'splatter': 'paint splatter',
        'low-poly': 'low poly geometric',
        'vector': 'clean vector graphics',
        'solid-black': 'solid black background',
        'solid-white': 'solid white background',
        'gradient-purple': 'purple gradient',
        'gradient-blue': 'blue gradient',
        'gradient-pink': 'pink gradient',
        'gradient-green': 'green gradient',
        'gradient-orange': 'orange gradient',
        'gradient-teal': 'teal gradient',
        'gradient-rainbow': 'rainbow gradient',
        'liquid': 'liquid abstract background',
        'smoke': 'smoke abstract background',
        'fractal': 'fractal pattern',
        'plasma': 'plasma energy',
        'crystal': 'crystalline background',
        'nebula': 'space nebula',
        'fire': 'fire and flames',
        'electric': 'electric energy',
        'organic': 'organic shapes',
        'geometric-abstract': 'geometric abstract',
        'gaming-setup': 'gaming setup with RGB',
        'money-stack': 'money stacks',
        'explosion-effect': 'explosion effect',
        'fire-background': 'fire background',
        'tech-circuit': 'circuit board',
        'neon-city': 'neon city',
        'space-stars': 'space with stars',
        'lightning': 'lightning background',
        'confetti': 'celebration confetti',
        'crown-gold': 'gold crown',
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

    // Format
    if (format && formatConfig) {
      const formatDescriptions: Record<string, (config: Record<string, string>) => string> = {
        reaction: (c) => `reaction face ${c.expression || 'surprised'} at ${c.position || 'right'}`,
        comparison: (c) => `${c.direction || 'vertical'} split comparison`,
        numbered: (c) => `number ${c.count || '1'} in ${c.style || 'circles'}`,
        arrow: (c) => `arrow pointing ${c.direction || 'right'}`,
        circle: (c) => `circle highlight`,
        split: (c) => `${c.direction || 'vertical'} split screen`,
        zoom: (c) => `zoom effect`,
        question: (c) => `question mark`,
        shocked: (c) => `shocked face`,
        money: (c) => `money theme`,
        warning: (c) => `warning sign`,
        secret: (c) => `mystery element`,
        trending: (c) => `trending graph`,
        new: (c) => `NEW badge`,
        giveaway: (c) => `giveaway theme`,
      };
      
      if (formatDescriptions[format]) {
        prompt += `Visual element: ${formatDescriptions[format](formatConfig)}. `;
      }
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

    // Initialize ZAI with retry logic
    const result = await retryWithBackoff(async () => {
      const zai = await ZAI.create();
      
      const response = await zai.images.generations.create({
        prompt,
        size: '1344x768', // YouTube thumbnail optimized size
      });

      const imageBase64 = response.data[0]?.base64;

      if (!imageBase64) {
        throw new Error('No image data returned from API');
      }

      return imageBase64;
    }, 3, 2000);

    return NextResponse.json({
      success: true,
      image: `data:image/png;base64,${result}`,
      prompt,
    });

  } catch (error) {
    console.error('Error generating thumbnail:', error);
    
    // Provide more detailed error message
    let errorMessage = 'Failed to generate thumbnail';
    
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Handle common errors with user-friendly messages
      if (errorMessage.includes('timeout') || errorMessage.includes('ETIMEDOUT')) {
        errorMessage = 'Request timed out. Please try again.';
      } else if (errorMessage.includes('502') || errorMessage.includes('503')) {
        errorMessage = 'Service temporarily unavailable. Please try again in a moment.';
      } else if (errorMessage.includes('rate limit')) {
        errorMessage = 'Too many requests. Please wait a moment and try again.';
      }
    }
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
