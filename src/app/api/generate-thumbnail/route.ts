import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

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
    backgroundCategory, 
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
        // Textures
        'marble': 'elegant marble texture background with natural veining',
        'wood': 'warm wooden texture with natural grain patterns',
        'concrete': 'industrial concrete texture with subtle imperfections',
        'fabric': 'soft fabric texture with subtle folds',
        'paper': 'textured paper background with subtle grain',
        'metal': 'metallic texture with reflective surfaces',
        'brick': 'exposed brick wall texture',
        'leather': 'luxurious leather texture background',
        'sand': 'natural sand texture with subtle variations',
        'stone': 'natural stone texture with organic patterns',
        // Realistic
        'sky': 'beautiful sky with clouds, natural lighting',
        'forest': 'lush forest background with trees and nature',
        'city': 'urban cityscape with buildings and skyline',
        'mountain': 'majestic mountain landscape view',
        'ocean': 'expansive ocean view with waves',
        'sunset': 'gorgeous sunset with warm orange and pink sky',
        'night': 'night sky with stars and moon',
        'studio': 'professional studio lighting setup',
        'abstract-nature': 'abstract nature photography',
        'urban': 'urban street photography background',
        // Illustrated
        'geometric': 'geometric patterns illustration, modern shapes',
        'waves': 'stylized waves illustration, fluid design',
        'particles': 'floating particles illustration, dynamic motion',
        'lines': 'abstract lines illustration, contemporary art',
        'dots': 'polka dots pattern illustration, playful design',
        'gradients': 'smooth gradient illustration, color transitions',
        'shapes': 'abstract shapes illustration, modern composition',
        'splatter': 'paint splatter illustration, artistic chaos',
        'low-poly': 'low poly geometric illustration, modern design',
        'vector': 'clean vector illustration, professional graphics',
        // Colors
        'solid-black': 'pure solid black background',
        'solid-white': 'pure solid white background',
        'gradient-purple': 'purple gradient background',
        'gradient-blue': 'blue gradient background',
        'gradient-pink': 'pink gradient background',
        'gradient-green': 'green gradient background',
        'gradient-orange': 'orange gradient background',
        'gradient-teal': 'teal gradient background',
        'gradient-rainbow': 'rainbow gradient background',
        // Abstract
        'liquid': 'liquid abstract background, fluid motion',
        'smoke': 'swirling smoke abstract background',
        'fractal': 'intricate fractal pattern background',
        'plasma': 'plasma energy abstract background',
        'crystal': 'crystalline abstract background',
        'nebula': 'space nebula abstract background',
        'fire': 'abstract fire and flames background',
        'electric': 'electric energy abstract background',
        'organic': 'organic flowing abstract shapes',
        'geometric-abstract': 'geometric abstract composition',
        // Viral
        'gaming-setup': 'gaming setup background with RGB lighting',
        'money-stack': 'money stacks background, wealth theme',
        'explosion-effect': 'explosion effect background, high impact',
        'fire-background': 'dramatic fire background',
        'tech-circuit': 'technology circuit board background',
        'neon-city': 'neon lit city background',
        'space-stars': 'space with stars and galaxies',
        'lightning': 'dramatic lightning background',
        'confetti': 'celebration confetti background',
        'crown-gold': 'luxurious gold and crown background',
      };
      prompt += `Background: ${backgroundDescriptions[background] || background}. `;
    }

    // Colors
    if (colors && colors.length > 0) {
      prompt += `Color scheme featuring ${colors.join(', ')}`;
      if (blendMode && blendMode !== 'normal') {
        prompt += ` with ${blendMode} blend effect`;
      }
      prompt += '. ';
    }

    // Font
    if (font) {
      const fontDescriptions: Record<string, string> = {
        impact: 'bold Impact-style typography, heavy and impactful',
        bebas: 'Bebas Neue style tall bold letters, modern display font',
        oswald: 'Oswald condensed font style, strong and readable',
        montserrat: 'Montserrat modern sans-serif style, clean typography',
        roboto: 'Roboto Condensed style, professional and versatile',
        playfair: 'Playfair Display elegant serif style, sophisticated',
      };
      prompt += `Typography: ${fontDescriptions[font] || font}. `;
    }

    // Font Size
    if (fontSize) {
      const sizeDescriptions: Record<string, string> = {
        small: 'modest sized text that doesn\'t overwhelm',
        medium: 'balanced medium sized prominent text',
        large: 'extra large bold text that dominates the thumbnail',
      };
      prompt += `Text size: ${sizeDescriptions[fontSize]}. `;
    }

    // Format with configuration
    if (format && formatConfig) {
      const formatDescriptions: Record<string, (config: Record<string, string>) => string> = {
        reaction: (c) => `reaction face with ${c.expression || 'surprised'} expression positioned ${c.position || 'right'}, ${c.size || 'medium'} size`,
        comparison: (c) => `${c.direction || 'vertical'} split screen comparison with ${c.ratio || '50/50'} ratio and ${c.style || 'clean'} divider`,
        numbered: (c) => `numbered list with number ${c.count || '1'} in ${c.style || 'circles'} style`,
        arrow: (c) => `${c.color || 'red'} arrow pointing ${c.direction || 'right'}, ${c.size || 'medium'} size at ${c.position || 'center'}${c.target ? ` pointing to ${c.target}` : ''}`,
        circle: (c) => `${c.color || 'red'} circle highlight, ${c.style || 'solid'} style, ${c.size || 'medium'} size${c.target ? ` around ${c.target}` : ''}`,
        split: (c) => `${c.direction || 'vertical'} split screen with ${c.ratio || '50/50'} ratio`,
        zoom: (c) => `zoom magnifying effect at ${c.position || 'center'}, ${c.size || 'medium'} magnifier`,
        question: (c) => `${c.style || 'classic'} question mark in ${c.color || 'yellow'}, ${c.size || 'medium'} size`,
        shocked: (c) => `shocked face expression positioned ${c.position || 'right'}, ${c.size || 'medium'} size`,
        money: (c) => `money theme with ${c.currency || '$'} currency in ${c.style || 'stacks'} style`,
        warning: (c) => `${c.type || 'danger'} warning sign in ${c.color || 'yellow'} positioned ${c.position || 'top'}`,
        secret: (c) => `secret/mystery element in ${c.style || 'mystery'} style`,
        trending: (c) => `trending graph pointing ${c.direction || 'up'} in ${c.color || 'green'}`,
        new: (c) => `NEW badge in ${c.color || 'red'} at ${c.position || 'top-right'}`,
        giveaway: (c) => `giveaway gift theme in ${c.style || 'gift-box'} style`,
      };
      
      if (formatDescriptions[format]) {
        prompt += `Visual element: ${formatDescriptions[format](formatConfig)}. `;
      }
    }

    // Character
    if (character && character.type) {
      const charParts: string[] = [];
      
      // Character type
      const typeDescriptions: Record<string, string> = {
        'human-male': 'realistic human male character',
        'human-female': 'realistic human female character',
        'cartoon-male': 'cartoon style male character',
        'cartoon-female': 'cartoon style female character',
        'anime-male': 'anime style male character',
        'anime-female': 'anime style female character',
        'animal-dog': 'cute dog character',
        'animal-cat': 'cute cat character',
        'animal-other': 'cute animal character',
        'child': 'child character',
        'young-adult': 'young adult character',
        'adult': 'adult character',
        'senior': 'senior elderly character',
        'robot': 'futuristic robot character',
        'alien': 'alien sci-fi character',
        'fantasy': 'fantasy magical character',
      };
      charParts.push(typeDescriptions[character.type] || character.type);
      
      if (character.pose) charParts.push(`${character.pose} pose`);
      if (character.expression) charParts.push(`${character.expression} expression`);
      if (character.outfit) charParts.push(`wearing ${character.outfit} outfit`);
      if (character.accessories && character.accessories !== 'none') {
        charParts.push(`with ${character.accessories}`);
      }
      if (character.hairStyle) charParts.push(`${character.hairStyle} hair`);
      if (character.hairColor) charParts.push(`${character.hairColor} hair color`);
      
      prompt += `Include a ${charParts.join(', ')}. `;
    }
  }

  // Add YouTube thumbnail specific requirements
  prompt += `The image must be eye-catching, high quality, suitable for YouTube thumbnail (16:9 aspect ratio), with clear visual hierarchy and professional composition. `;
  prompt += `IMPORTANT: The title text "${title}" must be prominently displayed and easily readable. Do not add any other text or words to the image. No watermarks.`;

  return prompt;
}

export async function POST(request: NextRequest) {
  try {
    const data: GenerateRequest = await request.json();

    // Validate required fields
    if (!data.title || !data.style) {
      return NextResponse.json(
        { error: 'Title and style are required' },
        { status: 400 }
      );
    }

    // Build the prompt
    const prompt = buildPrompt(data);

    // Initialize ZAI
    const zai = await ZAI.create();

    // Generate the image
    const response = await zai.images.generations.create({
      prompt,
      size: '1344x768', // YouTube thumbnail optimized size
    });

    // Get the base64 image data
    const imageBase64 = response.data[0]?.base64;

    if (!imageBase64) {
      throw new Error('No image data returned from API');
    }

    return NextResponse.json({
      success: true,
      image: `data:image/png;base64,${imageBase64}`,
      prompt,
    });
  } catch (error) {
    console.error('Error generating thumbnail:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate thumbnail' },
      { status: 500 }
    );
  }
}
