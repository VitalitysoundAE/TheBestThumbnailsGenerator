'use client';

import { useState, useCallback } from 'react';
import { LanguageProvider, useLanguage } from '@/hooks/useLanguage';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Sparkles,
  Download,
  Image as ImageIcon,
  Palette,
  Type,
  User,
  Wand2,
  Loader2,
  Check,
  Crown,
  Zap,
  Eye,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Heart,
  X,
  Settings,
  ArrowRight,
  Circle,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  Gift,
  Star,
} from 'lucide-react';

// Free styles (5)
const freeStyles = [
  { id: 'dramatic', image: '/styles/dramatic.png' },
  { id: 'minimalist', image: '/styles/minimalist.png' },
  { id: 'explosive', image: '/styles/explosive.png' },
  { id: 'professional', image: '/styles/professional.png' },
  { id: 'neon', image: '/styles/neon.png' },
];

// Pro styles (20 total)
const proStyles = [
  ...freeStyles,
  { id: 'cinematic', image: '/styles/cinematic.png' },
  { id: 'gaming', image: '/styles/gaming.png' },
  { id: 'retro', image: '/styles/retro.png' },
  { id: 'tech', image: '/styles/tech.png' },
  { id: 'cartoon', image: '/styles/cartoon.png' },
  { id: 'horror', image: '/styles/horror.png' },
  { id: 'anime', image: '/styles/anime.png' },
  { id: 'vintage', image: '/styles/vintage.png' },
  { id: 'graffiti', image: '/styles/graffiti.png' },
  { id: 'scifi', image: '/styles/scifi.png' },
  { id: 'popart', image: '/styles/popart.png' },
  { id: 'darkmode', image: '/styles/darkmode.png' },
  { id: 'pastel', image: '/styles/pastel.png' },
  { id: 'cyberpunk', image: '/styles/cyberpunk.png' },
  { id: 'handdrawn', image: '/styles/handdrawn.png' },
  { id: '3d', image: '/styles/3d.png' },
  { id: 'watercolor', image: '/styles/watercolor.png' },
];

// Background categories with images
const backgroundCategories = {
  textures: [
    { id: 'marble', image: '/backgrounds/textures/marble.png' },
    { id: 'wood', image: '/backgrounds/textures/wood.png' },
    { id: 'concrete', image: '/backgrounds/textures/concrete.png' },
    { id: 'fabric', image: '/backgrounds/textures/fabric.png' },
    { id: 'paper', image: '/backgrounds/textures/paper.png' },
    { id: 'metal', image: '/backgrounds/textures/metal.png' },
    { id: 'brick', image: '/backgrounds/textures/brick.png' },
    { id: 'leather', image: '/backgrounds/textures/leather.png' },
    { id: 'sand', image: '/backgrounds/textures/sand.png' },
    { id: 'stone', image: '/backgrounds/textures/stone.png' },
  ],
  realistic: [
    { id: 'sky', image: '/backgrounds/realistic/sky.png' },
    { id: 'forest', image: '/backgrounds/realistic/forest.png' },
    { id: 'city', image: '/backgrounds/realistic/city.png' },
    { id: 'mountain', image: '/backgrounds/realistic/mountain.png' },
    { id: 'ocean', image: '/backgrounds/realistic/ocean.png' },
    { id: 'sunset', image: '/backgrounds/realistic/sunset.png' },
    { id: 'night', image: '/backgrounds/realistic/night.png' },
    { id: 'studio', image: '/backgrounds/realistic/studio.png' },
    { id: 'abstract-nature', image: '/backgrounds/realistic/abstract-nature.png' },
    { id: 'urban', image: '/backgrounds/realistic/urban.png' },
  ],
  illustrated: [
    { id: 'geometric', image: '/backgrounds/illustrated/geometric.png' },
    { id: 'waves', image: '/backgrounds/illustrated/waves.png' },
    { id: 'particles', image: '/backgrounds/illustrated/particles.png' },
    { id: 'lines', image: '/backgrounds/illustrated/lines.png' },
    { id: 'dots', image: '/backgrounds/illustrated/dots.png' },
    { id: 'gradients', image: '/backgrounds/illustrated/gradients.png' },
    { id: 'shapes', image: '/backgrounds/illustrated/shapes.png' },
    { id: 'splatter', image: '/backgrounds/illustrated/splatter.png' },
    { id: 'low-poly', image: '/backgrounds/illustrated/low-poly.png' },
    { id: 'vector', image: '/backgrounds/illustrated/vector.png' },
  ],
  colors: [
    { id: 'solid-black', image: '/backgrounds/colors/solid-black.png' },
    { id: 'solid-white', image: '/backgrounds/colors/solid-white.png' },
    { id: 'gradient-purple', image: '/backgrounds/colors/gradient-purple.png' },
    { id: 'gradient-blue', image: '/backgrounds/colors/gradient-blue.png' },
    { id: 'gradient-pink', image: '/backgrounds/colors/gradient-pink.png' },
    { id: 'gradient-green', image: '/backgrounds/colors/gradient-green.png' },
    { id: 'gradient-orange', image: '/backgrounds/colors/gradient-orange.png' },
    { id: 'gradient-teal', image: '/backgrounds/colors/gradient-teal.png' },
    { id: 'gradient-rainbow', image: '/backgrounds/colors/gradient-rainbow.png' },
  ],
  abstract: [
    { id: 'liquid', image: '/backgrounds/abstract/liquid.png' },
    { id: 'smoke', image: '/backgrounds/abstract/smoke.png' },
    { id: 'fractal', image: '/backgrounds/abstract/fractal.png' },
    { id: 'plasma', image: '/backgrounds/abstract/plasma.png' },
    { id: 'crystal', image: '/backgrounds/abstract/crystal.png' },
    { id: 'nebula', image: '/backgrounds/abstract/nebula.png' },
    { id: 'fire', image: '/backgrounds/abstract/fire.png' },
    { id: 'electric', image: '/backgrounds/abstract/electric.png' },
    { id: 'organic', image: '/backgrounds/abstract/organic.png' },
    { id: 'geometric-abstract', image: '/backgrounds/abstract/geometric-abstract.png' },
  ],
  viral: [
    { id: 'gaming-setup', image: '/backgrounds/viral/gaming-setup.png' },
    { id: 'money-stack', image: '/backgrounds/viral/money-stack.png' },
    { id: 'explosion-effect', image: '/backgrounds/viral/explosion-effect.png' },
    { id: 'fire-background', image: '/backgrounds/viral/fire-background.png' },
    { id: 'tech-circuit', image: '/backgrounds/viral/tech-circuit.png' },
    { id: 'neon-city', image: '/backgrounds/viral/neon-city.png' },
    { id: 'space-stars', image: '/backgrounds/viral/space-stars.png' },
    { id: 'lightning', image: '/backgrounds/viral/lightning.png' },
    { id: 'confetti', image: '/backgrounds/viral/confetti.png' },
    { id: 'crown-gold', image: '/backgrounds/viral/crown-gold.png' },
  ],
};

// 18 Custom colors
const customColors = [
  { id: 'red', hex: '#EF4444', name: 'Red' },
  { id: 'orange', hex: '#F97316', name: 'Orange' },
  { id: 'yellow', hex: '#EAB308', name: 'Yellow' },
  { id: 'green', hex: '#22C55E', name: 'Green' },
  { id: 'teal', hex: '#14B8A6', name: 'Teal' },
  { id: 'blue', hex: '#3B82F6', name: 'Blue' },
  { id: 'indigo', hex: '#6366F1', name: 'Indigo' },
  { id: 'purple', hex: '#A855F7', name: 'Purple' },
  { id: 'pink', hex: '#EC4899', name: 'Pink' },
  { id: 'white', hex: '#FFFFFF', name: 'White' },
  { id: 'black', hex: '#000000', name: 'Black' },
  { id: 'gray', hex: '#6B7280', name: 'Gray' },
  { id: 'brown', hex: '#A16207', name: 'Brown' },
  { id: 'cyan', hex: '#06B6D4', name: 'Cyan' },
  { id: 'magenta', hex: '#D946EF', name: 'Magenta' },
  { id: 'lime', hex: '#84CC16', name: 'Lime' },
  { id: 'gold', hex: '#EAB308', name: 'Gold' },
  { id: 'silver', hex: '#C0C0C0', name: 'Silver' },
];

// Fonts with CSS classes
const fonts = [
  { id: 'impact', name: 'Impact', class: 'font-black uppercase tracking-wide' },
  { id: 'bebas', name: 'Bebas', class: 'font-bold uppercase tracking-widest' },
  { id: 'oswald', name: 'Oswald', class: 'font-semibold uppercase' },
  { id: 'montserrat', name: 'Montserrat', class: 'font-medium' },
  { id: 'roboto', name: 'Roboto', class: 'font-normal' },
  { id: 'playfair', name: 'Playfair', class: 'font-medium italic' },
];

// Font sizes
const fontSizes = [
  { id: 'small', name: 'S' },
  { id: 'medium', name: 'M' },
  { id: 'large', name: 'L' },
];

// Viral formats with images and configuration options
const viralFormats = [
  {
    id: 'reaction',
    image: '/formats/reaction.png',
    config: [
      { key: 'expression', type: 'select', options: ['surprised', 'happy', 'shocked', 'thinking', 'laughing'], label: 'Expression' },
      { key: 'position', type: 'select', options: ['left', 'right', 'top-left', 'top-right'], label: 'Position' },
      { key: 'size', type: 'select', options: ['small', 'medium', 'large'], label: 'Size' },
    ]
  },
  {
    id: 'comparison',
    image: '/formats/comparison.png',
    config: [
      { key: 'direction', type: 'select', options: ['vertical', 'horizontal'], label: 'Split Direction' },
      { key: 'ratio', type: 'select', options: ['50/50', '60/40', '70/30'], label: 'Ratio' },
      { key: 'style', type: 'select', options: ['clean', 'jagged', 'gradient'], label: 'Divider Style' },
    ]
  },
  {
    id: 'numbered',
    image: '/formats/numbered.png',
    config: [
      { key: 'count', type: 'select', options: ['1', '2', '3', '4', '5'], label: 'Number' },
      { key: 'style', type: 'select', options: ['circles', 'boxes', 'badges'], label: 'Style' },
      { key: 'color', type: 'color', label: 'Color' },
    ]
  },
  {
    id: 'arrow',
    image: '/formats/arrow.png',
    config: [
      { key: 'direction', type: 'select', options: ['left', 'right', 'up', 'down'], label: 'Direction' },
      { key: 'color', type: 'color', label: 'Color' },
      { key: 'size', type: 'select', options: ['small', 'medium', 'large'], label: 'Size' },
      { key: 'position', type: 'select', options: ['center', 'top-left', 'top-right', 'bottom-left', 'bottom-right'], label: 'Position' },
      { key: 'target', type: 'text', label: 'Points to' },
    ]
  },
  {
    id: 'circle',
    image: '/formats/circle.png',
    config: [
      { key: 'color', type: 'color', label: 'Circle Color' },
      { key: 'size', type: 'select', options: ['small', 'medium', 'large'], label: 'Size' },
      { key: 'style', type: 'select', options: ['solid', 'dashed', 'glowing'], label: 'Style' },
      { key: 'target', type: 'text', label: 'Highlights' },
    ]
  },
  {
    id: 'split',
    image: '/formats/split.png',
    config: [
      { key: 'direction', type: 'select', options: ['vertical', 'horizontal', 'diagonal'], label: 'Split Type' },
      { key: 'ratio', type: 'select', options: ['50/50', '60/40', '70/30'], label: 'Ratio' },
    ]
  },
  {
    id: 'zoom',
    image: '/formats/zoom.png',
    config: [
      { key: 'position', type: 'select', options: ['center', 'corner'], label: 'Zoom Position' },
      { key: 'size', type: 'select', options: ['small', 'medium', 'large'], label: 'Magnifier Size' },
    ]
  },
  {
    id: 'question',
    image: '/formats/question.png',
    config: [
      { key: 'style', type: 'select', options: ['classic', 'modern', 'glowing'], label: 'Style' },
      { key: 'color', type: 'color', label: 'Color' },
      { key: 'size', type: 'select', options: ['small', 'medium', 'large'], label: 'Size' },
    ]
  },
  {
    id: 'shocked',
    image: '/formats/shocked.png',
    config: [
      { key: 'position', type: 'select', options: ['left', 'right', 'center'], label: 'Position' },
      { key: 'size', type: 'select', options: ['small', 'medium', 'large'], label: 'Size' },
    ]
  },
  {
    id: 'money',
    image: '/formats/money.png',
    config: [
      { key: 'currency', type: 'select', options: ['$', '€', '£', '¥'], label: 'Currency' },
      { key: 'style', type: 'select', options: ['stacks', 'rain', 'bills'], label: 'Style' },
    ]
  },
  {
    id: 'warning',
    image: '/formats/warning.png',
    config: [
      { key: 'type', type: 'select', options: ['caution', 'danger', 'alert'], label: 'Type' },
      { key: 'color', type: 'color', label: 'Color' },
      { key: 'position', type: 'select', options: ['top', 'bottom', 'side'], label: 'Position' },
    ]
  },
  {
    id: 'secret',
    image: '/formats/secret.png',
    config: [
      { key: 'style', type: 'select', options: ['mystery', 'classified', 'hidden'], label: 'Style' },
    ]
  },
  {
    id: 'trending',
    image: '/formats/trending.png',
    config: [
      { key: 'direction', type: 'select', options: ['up', 'down'], label: 'Direction' },
      { key: 'color', type: 'color', label: 'Color' },
    ]
  },
  {
    id: 'new',
    image: '/formats/new.png',
    config: [
      { key: 'color', type: 'color', label: 'Badge Color' },
      { key: 'position', type: 'select', options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'], label: 'Position' },
    ]
  },
  {
    id: 'giveaway',
    image: '/formats/giveaway.png',
    config: [
      { key: 'style', type: 'select', options: ['gift-box', 'confetti', 'prize'], label: 'Style' },
      { key: 'color', type: 'color', label: 'Color Scheme' },
    ]
  },
];

// Character types with images
const characterTypes = [
  { id: 'human-male', image: '/characters/human-male.png', label: 'Human Male' },
  { id: 'human-female', image: '/characters/human-female.png', label: 'Human Female' },
  { id: 'cartoon-male', image: '/characters/cartoon-male.png', label: 'Cartoon Male' },
  { id: 'cartoon-female', image: '/characters/cartoon-female.png', label: 'Cartoon Female' },
  { id: 'anime-male', image: '/characters/anime-male.png', label: 'Anime Male' },
  { id: 'anime-female', image: '/characters/anime-female.png', label: 'Anime Female' },
  { id: 'animal-dog', image: '/characters/animal-dog.png', label: 'Dog' },
  { id: 'animal-cat', image: '/characters/animal-cat.png', label: 'Cat' },
  { id: 'animal-other', image: '/characters/animal-other.png', label: 'Other Animal' },
  { id: 'child', image: '/characters/child.png', label: 'Child' },
  { id: 'young-adult', image: '/characters/young-adult.png', label: 'Young Adult' },
  { id: 'adult', image: '/characters/adult.png', label: 'Adult' },
  { id: 'senior', image: '/characters/senior.png', label: 'Senior' },
  { id: 'robot', image: '/characters/robot.png', label: 'Robot' },
  { id: 'alien', image: '/characters/alien.png', label: 'Alien' },
  { id: 'fantasy', image: '/characters/fantasy.png', label: 'Fantasy' },
];

// Character configuration options
const characterConfig = {
  gender: ['male', 'female', 'other'],
  age: ['child', 'young-adult', 'adult', 'senior'],
  pose: ['standing', 'sitting', 'pointing', 'thinking', 'excited', 'waving'],
  expression: ['happy', 'surprised', 'thinking', 'shocked', 'confident', 'sad', 'angry'],
  outfit: ['casual', 'formal', 'sporty', 'gaming', 'tech', 'fantasy'],
  accessories: ['none', 'glasses', 'headphones', 'hat', 'watch', 'jewelry'],
  hairStyle: ['short', 'medium', 'long', 'bald', 'curly', 'ponytail'],
};

// Blend modes
const blendModes = ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten'];

function ThumbnailGenerator() {
  const { t } = useLanguage();

  // Core state
  const [isPro, setIsPro] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Style state
  const [selectedStyle, setSelectedStyle] = useState('dramatic');

  // Pro features state
  const [backgroundCategory, setBackgroundCategory] = useState<keyof typeof backgroundCategories>('textures');
  const [selectedBackground, setSelectedBackground] = useState('');

  // Custom colors - now 0-3 colors
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [blendMode, setBlendMode] = useState('normal');

  // Font state
  const [selectedFont, setSelectedFont] = useState('impact');
  const [selectedFontSize, setSelectedFontSize] = useState('medium');

  // Format state
  const [selectedFormat, setSelectedFormat] = useState('');
  const [formatConfig, setFormatConfig] = useState<Record<string, Record<string, string>>>({});
  const [expandedFormat, setExpandedFormat] = useState<string | null>(null);

  // Character state
  const [characterEnabled, setCharacterEnabled] = useState(false);
  const [selectedCharacterType, setSelectedCharacterType] = useState('');
  const [characterDetails, setCharacterDetails] = useState({
    gender: '',
    age: '',
    pose: '',
    expression: '',
    outfit: '',
    accessories: '',
    hairStyle: '',
    hairColor: '#000000',
  });
  const [expandedCharacter, setExpandedCharacter] = useState(false);

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [promptExpanded, setPromptExpanded] = useState(false);

  // Character limits
  const maxTitleChars = isPro ? 50 : 30;
  const maxDescChars = isPro ? 500 : 200;

  // Styles to show based on mode
  const styles = isPro ? proStyles : freeStyles;

  // Toggle color selection
  const toggleColor = (hex: string) => {
    if (selectedColors.includes(hex)) {
      setSelectedColors(selectedColors.filter(c => c !== hex));
    } else if (selectedColors.length < 3) {
      setSelectedColors([...selectedColors, hex]);
    }
  };

  // Update format config
  const updateFormatConfig = (formatId: string, key: string, value: string) => {
    setFormatConfig(prev => ({
      ...prev,
      [formatId]: {
        ...(prev[formatId] || {}),
        [key]: value,
      }
    }));
  };

  // Generate thumbnail
  const generateThumbnail = async () => {
    if (!title.trim() || !selectedStyle) return;

    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-thumbnail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          style: selectedStyle,
          isPro,
          background: selectedBackground,
          backgroundCategory,
          colors: selectedColors,
          blendMode,
          font: selectedFont,
          fontSize: selectedFontSize,
          format: selectedFormat,
          formatConfig: formatConfig[selectedFormat],
          character: characterEnabled ? {
            type: selectedCharacterType,
            ...characterDetails,
          } : undefined,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedImage(data.image);
        setGeneratedPrompt(data.prompt);
      } else {
        throw new Error(data.error || 'Generation failed');
      }
    } catch (error) {
      console.error('Error generating thumbnail:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Download image
  const downloadImage = (format: 'png' | 'jpg') => {
    if (!generatedImage) return;

    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `thumbnail-${title.replace(/\s+/g, '-').slice(0, 20)}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get font class for preview
  const getFontClass = () => {
    const font = fonts.find(f => f.id === selectedFont);
    return font?.class || '';
  };

  // Get font size class
  const getFontSizeClass = () => {
    switch (selectedFontSize) {
      case 'small': return 'text-xl';
      case 'medium': return 'text-2xl';
      case 'large': return 'text-3xl';
      default: return 'text-2xl';
    }
  };

  return (
    <div className={`min-h-screen text-white overflow-hidden transition-all duration-500 ${
      isPro 
        ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-black' 
        : 'bg-gradient-to-br from-gray-950 via-gray-900 to-black'
    }`}>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-slow ${
          isPro ? 'bg-amber-500/20' : 'bg-purple-500/20'
        }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-slow animation-delay-2000 ${
          isPro ? 'bg-orange-500/20' : 'bg-pink-500/20'
        }`} />
        <div className={`absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse-slow animation-delay-4000 ${
          isPro ? 'bg-yellow-500/10' : 'bg-cyan-500/10'
        }`} />
      </div>

      {/* Header */}
      <header className={`relative z-10 border-b backdrop-blur-xl ${
        isPro 
          ? 'border-amber-500/30 bg-gradient-to-r from-amber-900/20 via-gray-900/80 to-amber-900/20' 
          : 'border-white/10 bg-white/5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center ${
                isPro 
                  ? 'bg-gradient-to-br from-amber-400 via-orange-500 to-yellow-500' 
                  : 'bg-gradient-to-br from-purple-500 to-pink-500'
              }`}>
                <Wand2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold bg-clip-text text-transparent ${
                  isPro 
                    ? 'bg-gradient-to-r from-amber-200 via-yellow-200 to-orange-200' 
                    : 'bg-gradient-to-r from-white via-purple-200 to-pink-200'
                }`}>
                  {t('app.title')}
                </h1>
                <p className="text-xs text-white/50">{t('app.subtitle')}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Pro Toggle */}
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${
                isPro 
                  ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/30' 
                  : 'bg-white/5 border-white/10'
              }`}>
                <span className={`text-sm ${!isPro ? 'text-white' : 'text-white/50'}`}>
                  {t('header.free')}
                </span>
                <Switch
                  checked={isPro}
                  onCheckedChange={setIsPro}
                  className={`data-[state=checked]:${
                    isPro ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'
                  }`}
                />
                <span className={`text-sm flex items-center gap-1 ${isPro ? 'text-amber-300' : 'text-white/50'}`}>
                  {isPro && <Crown className="w-3 h-3 text-amber-400" />}
                  {t('header.pro')}
                </span>
              </div>

              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            {/* Title Input */}
            <Card className={`backdrop-blur-xl shadow-2xl ${
              isPro 
                ? 'bg-gradient-to-br from-amber-900/10 to-orange-900/10 border-amber-500/20' 
                : 'bg-white/5 border-white/10'
            }`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className={`w-4 h-4 ${isPro ? 'text-amber-400' : 'text-purple-400'}`} />
                  {t('title.label')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value.slice(0, maxTitleChars))}
                    placeholder={t('title.placeholder')}
                    className="bg-white/5 border-white/20 focus:border-purple-500 focus:ring-purple-500/20 text-white placeholder:text-white/30 h-12 text-lg"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <span className={`text-sm ${title.length >= maxTitleChars ? 'text-red-400' : 'text-white/50'}`}>
                      {title.length}/{maxTitleChars}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-white/40 mt-2">
                  {isPro ? t('title.proLimit') : t('title.freeLimit')}
                </p>
              </CardContent>
            </Card>

            {/* Description Input */}
            <Card className={`backdrop-blur-xl shadow-2xl ${
              isPro 
                ? 'bg-gradient-to-br from-amber-900/10 to-orange-900/10 border-amber-500/20' 
                : 'bg-white/5 border-white/10'
            }`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className={`w-4 h-4 ${isPro ? 'text-amber-400' : 'text-purple-400'}`} />
                  {t('description.label')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value.slice(0, maxDescChars))}
                  placeholder={t('description.placeholder')}
                  className="bg-white/5 border-white/20 focus:border-purple-500 focus:ring-purple-500/20 text-white placeholder:text-white/30 min-h-[80px] resize-none"
                />
                <div className="flex justify-between mt-2">
                  <p className="text-xs text-white/40">
                    {t('description.hint')}
                  </p>
                  <span className={`text-xs ${description.length >= maxDescChars ? 'text-red-400' : 'text-white/50'}`}>
                    {description.length}/{maxDescChars}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Style Selector with Images */}
            <Card className={`backdrop-blur-xl shadow-2xl ${
              isPro 
                ? 'bg-gradient-to-br from-amber-900/10 to-orange-900/10 border-amber-500/20' 
                : 'bg-white/5 border-white/10'
            }`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Palette className={`w-4 h-4 ${isPro ? 'text-amber-400' : 'text-pink-400'}`} />
                  {t('styles.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className={styles.length > 10 ? 'h-64' : 'h-auto'}>
                  <div className={`grid gap-3 ${styles.length <= 5 ? 'grid-cols-5' : 'grid-cols-4'}`}>
                    {styles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setSelectedStyle(style.id)}
                        className={`group relative aspect-square rounded-xl overflow-hidden transition-all duration-300 ${
                          selectedStyle === style.id
                            ? isPro 
                              ? 'ring-2 ring-amber-500 ring-offset-2 ring-offset-gray-900 scale-105' 
                              : 'ring-2 ring-purple-500 ring-offset-2 ring-offset-gray-900 scale-105'
                            : 'hover:scale-105'
                        }`}
                      >
                        <img 
                          src={style.image} 
                          alt={style.id}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-medium text-white text-center px-1 capitalize drop-shadow-lg">
                            {t(`styles.${style.id}`)}
                          </span>
                        </div>
                        {selectedStyle === style.id && (
                          <div className={`absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center ${
                            isPro ? 'bg-amber-500' : 'bg-purple-500'
                          }`}>
                            <Check className="w-2.5 h-2.5 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Pro Features */}
            {isPro && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-amber-400">
                  <Crown className="w-4 h-4" />
                  <span className="text-sm font-medium">{t('pro.title')}</span>
                  <Star className="w-3 h-3 animate-pulse" />
                </div>

                {/* Backgrounds with Images */}
                <Card className="bg-gradient-to-br from-amber-900/10 to-orange-900/10 backdrop-blur-xl border-amber-500/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-amber-400" />
                      {t('pro.backgrounds')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={backgroundCategory} onValueChange={(v) => setBackgroundCategory(v as keyof typeof backgroundCategories)}>
                      <TabsList className="bg-white/5 border border-white/10 grid grid-cols-6 h-auto p-1">
                        {Object.keys(backgroundCategories).map((cat) => (
                          <TabsTrigger
                            key={cat}
                            value={cat}
                            className="text-xs py-1.5 data-[state=active]:bg-amber-500/50 data-[state=active]:text-white"
                          >
                            {t(`pro.backgrounds.${cat}`)}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      {Object.entries(backgroundCategories).map(([cat, bgs]) => (
                        <TabsContent key={cat} value={cat} className="mt-3">
                          <ScrollArea className="h-40">
                            <div className="grid grid-cols-5 gap-2 pr-4">
                              {bgs.map((bg) => (
                                <button
                                  key={bg.id}
                                  onClick={() => setSelectedBackground(bg.id)}
                                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                                    selectedBackground === bg.id
                                      ? 'border-amber-500 scale-105'
                                      : 'border-white/10 hover:border-white/30'
                                  }`}
                                >
                                  <img 
                                    src={bg.image} 
                                    alt={bg.id}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-1">
                                    <span className="text-[8px] text-white capitalize text-center leading-tight">
                                      {bg.id.replace('-', ' ')}
                                    </span>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </ScrollArea>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </CardContent>
                </Card>

                {/* Custom Colors - 18 colors, 0-3 selection */}
                <Card className="bg-gradient-to-br from-amber-900/10 to-orange-900/10 backdrop-blur-xl border-amber-500/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Palette className="w-4 h-4 text-amber-400" />
                      {t('pro.colors')} ({selectedColors.length}/3)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Color grid */}
                    <div className="grid grid-cols-9 gap-2">
                      {customColors.map((color) => (
                        <button
                          key={color.id}
                          onClick={() => toggleColor(color.hex)}
                          className={`relative w-8 h-8 rounded-lg border-2 transition-all ${
                            selectedColors.includes(color.hex)
                              ? 'border-amber-400 scale-110 ring-2 ring-amber-400/50'
                              : 'border-white/20 hover:scale-105'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        >
                          {selectedColors.includes(color.hex) && (
                            <Check className={`absolute inset-0 m-auto w-4 h-4 ${
                              color.hex === '#FFFFFF' ? 'text-black' : 'text-white'
                            }`} />
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Selected colors display */}
                    {selectedColors.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-white/50">{t('pro.colors.selected')}:</span>
                        {selectedColors.map((hex, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/10"
                          >
                            <div 
                              className="w-4 h-4 rounded-full border border-white/20"
                              style={{ backgroundColor: hex }}
                            />
                            <span className="text-xs text-white">{hex}</span>
                            <button
                              onClick={() => toggleColor(hex)}
                              className="text-white/50 hover:text-white"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Blend mode */}
                    <div>
                      <Label className="text-xs text-white/50 mb-2 block">{t('pro.colors.blendModes')}</Label>
                      <Select value={blendMode} onValueChange={setBlendMode}>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/10">
                          {blendModes.map((mode) => (
                            <SelectItem key={mode} value={mode} className="text-white">
                              {t(`blend.${mode}`)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Fonts with Preview */}
                <Card className="bg-gradient-to-br from-amber-900/10 to-orange-900/10 backdrop-blur-xl border-amber-500/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Type className="w-4 h-4 text-amber-400" />
                      {t('pro.fonts')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Font buttons - smaller */}
                    <div className="grid grid-cols-3 gap-2">
                      {fonts.map((font) => (
                        <button
                          key={font.id}
                          onClick={() => setSelectedFont(font.id)}
                          className={`p-2 rounded-lg border transition-all text-center ${
                            selectedFont === font.id
                              ? 'border-amber-500 bg-amber-500/20'
                              : 'border-white/10 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <span className={`text-sm ${font.class}`}>{font.name}</span>
                        </button>
                      ))}
                    </div>

                    {/* Font sizes */}
                    <div className="flex items-center gap-2">
                      <Label className="text-xs text-white/50">{t('pro.fontSizes')}:</Label>
                      {fontSizes.map((size) => (
                        <Button
                          key={size.id}
                          variant={selectedFontSize === size.id ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedFontSize(size.id)}
                          className={`w-8 h-8 p-0 ${
                            selectedFontSize === size.id 
                              ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                              : 'border-white/20 text-white/70'
                          }`}
                        >
                          {size.name}
                        </Button>
                      ))}
                    </div>

                    {/* Title Preview */}
                    {title && (
                      <div className="p-4 rounded-lg bg-black/30 border border-white/10">
                        <Label className="text-xs text-white/50 mb-2 block">{t('pro.fontPreview')}:</Label>
                        <p className={`text-center ${getFontClass()} ${getFontSizeClass()} text-white drop-shadow-lg`}>
                          {title}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Viral Formats with Images and Config */}
                <Card className="bg-gradient-to-br from-amber-900/10 to-orange-900/10 backdrop-blur-xl border-amber-500/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      {t('pro.formats')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-auto">
                      <div className="grid grid-cols-5 gap-2 pr-4">
                        {viralFormats.map((format) => (
                          <div key={format.id}>
                            <button
                              onClick={() => {
                                setSelectedFormat(selectedFormat === format.id ? '' : format.id);
                                setExpandedFormat(expandedFormat === format.id ? null : format.id);
                              }}
                              className={`relative w-full aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                                selectedFormat === format.id
                                  ? 'border-amber-500 ring-2 ring-amber-400/30'
                                  : 'border-white/10 hover:border-white/30'
                              }`}
                            >
                              <img 
                                src={format.image} 
                                alt={format.id}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/30" />
                              {selectedFormat === format.id && (
                                <div className="absolute top-1 right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
                                  <Check className="w-2.5 h-2.5 text-white" />
                                </div>
                              )}
                            </button>
                            
                            {/* Expanded Config */}
                            {expandedFormat === format.id && format.config.length > 0 && (
                              <div className="mt-2 p-2 bg-black/30 rounded-lg border border-white/10 space-y-2">
                                {format.config.map((cfg) => (
                                  <div key={cfg.key}>
                                    <Label className="text-[10px] text-white/50">{cfg.label}</Label>
                                    {cfg.type === 'select' ? (
                                      <Select 
                                        value={formatConfig[format.id]?.[cfg.key] || ''} 
                                        onValueChange={(v) => updateFormatConfig(format.id, cfg.key, v)}
                                      >
                                        <SelectTrigger className="h-7 text-xs bg-white/5 border-white/10">
                                          <SelectValue placeholder="Select..." />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-900 border-white/10">
                                          {cfg.options?.map((opt) => (
                                            <SelectItem key={opt} value={opt} className="text-xs">
                                              {opt}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    ) : cfg.type === 'color' ? (
                                      <input
                                        type="color"
                                        value={formatConfig[format.id]?.[cfg.key] || '#FF0000'}
                                        onChange={(e) => updateFormatConfig(format.id, cfg.key, e.target.value)}
                                        className="w-full h-7 rounded cursor-pointer bg-transparent border border-white/10"
                                      />
                                    ) : cfg.type === 'text' ? (
                                      <Input
                                        value={formatConfig[format.id]?.[cfg.key] || ''}
                                        onChange={(e) => updateFormatConfig(format.id, cfg.key, e.target.value)}
                                        placeholder={cfg.label}
                                        className="h-7 text-xs bg-white/5 border-white/10"
                                      />
                                    ) : null}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Character Toggle */}
                <Card className="bg-gradient-to-br from-amber-900/10 to-orange-900/10 backdrop-blur-xl border-amber-500/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <User className="w-4 h-4 text-amber-400" />
                        {t('pro.character')}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-white/50">{t('pro.character.enable')}</span>
                        <Switch
                          checked={characterEnabled}
                          onCheckedChange={setCharacterEnabled}
                          className="data-[state=checked]:bg-amber-500"
                        />
                      </div>
                    </CardTitle>
                  </CardHeader>
                  
                  {characterEnabled && (
                    <CardContent className="space-y-4">
                      {/* Character Type Selection */}
                      <div>
                        <Label className="text-xs text-white/50 mb-2 block">{t('pro.character.type')}</Label>
                        <ScrollArea className="h-32">
                          <div className="grid grid-cols-4 gap-2 pr-4">
                            {characterTypes.map((char) => (
                              <button
                                key={char.id}
                                onClick={() => {
                                  setSelectedCharacterType(char.id);
                                  setExpandedCharacter(true);
                                }}
                                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                                  selectedCharacterType === char.id
                                    ? 'border-amber-500 scale-105'
                                    : 'border-white/10 hover:border-white/30'
                                }`}
                              >
                                <img 
                                  src={char.image} 
                                  alt={char.label}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-1">
                                  <span className="text-[8px] text-white text-center leading-tight">
                                    {char.label}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>

                      {/* Character Details - Expandable */}
                      {selectedCharacterType && (
                        <Collapsible open={expandedCharacter} onOpenChange={setExpandedCharacter}>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="w-full text-amber-400 hover:bg-amber-500/10">
                              {expandedCharacter ? t('pro.character.hideOptions') : t('pro.character.showOptions')}
                              {expandedCharacter ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="space-y-3 pt-3">
                            <div className="grid grid-cols-2 gap-3">
                              {Object.entries(characterConfig).map(([key, options]) => (
                                <div key={key}>
                                  <Label className="text-xs text-white/50 mb-1 block">
                                    {t(`pro.character.${key}`)}
                                  </Label>
                                  <Select
                                    value={characterDetails[key as keyof typeof characterDetails] as string}
                                    onValueChange={(v) => setCharacterDetails({ ...characterDetails, [key]: v })}
                                  >
                                    <SelectTrigger className="bg-white/5 border-white/10 h-8">
                                      <SelectValue placeholder="-" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-900 border-white/10">
                                      {options.map((opt) => (
                                        <SelectItem key={opt} value={opt}>
                                          {t(`pro.character.${key}.${opt}`)}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              ))}
                            </div>
                            
                            {/* Hair Color Picker */}
                            <div>
                              <Label className="text-xs text-white/50 mb-1 block">{t('pro.character.hairColor')}</Label>
                              <input
                                type="color"
                                value={characterDetails.hairColor}
                                onChange={(e) => setCharacterDetails({ ...characterDetails, hairColor: e.target.value })}
                                className="w-full h-8 rounded cursor-pointer bg-transparent border border-white/10"
                              />
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      )}
                    </CardContent>
                  )}
                </Card>

                {/* Prompt Preview - Collapsible */}
                <Collapsible open={promptExpanded} onOpenChange={setPromptExpanded}>
                  <Card className="bg-gradient-to-br from-amber-900/10 to-orange-900/10 backdrop-blur-xl border-amber-500/20">
                    <CardHeader className="pb-2">
                      <CollapsibleTrigger asChild>
                        <CardTitle className="text-sm flex items-center justify-between cursor-pointer hover:text-amber-300 transition-colors">
                          <span className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-amber-400" />
                            {t('pro.promptPreview')}
                          </span>
                          {promptExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </CardTitle>
                      </CollapsibleTrigger>
                    </CardHeader>
                    <CollapsibleContent>
                      <CardContent>
                        <ScrollArea className="h-24">
                          <p className="text-xs text-white/50 leading-relaxed whitespace-pre-wrap">
                            {generatedPrompt || t('pro.promptPlaceholder')}
                          </p>
                        </ScrollArea>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              </div>
            )}

            {/* Generate Button */}
            <Button
              onClick={generateThumbnail}
              disabled={!title.trim() || isGenerating}
              className={`w-full h-14 text-lg font-semibold transition-all duration-300 shadow-lg ${
                isPro 
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-400 hover:via-orange-400 hover:to-yellow-400 shadow-amber-500/25 hover:shadow-amber-500/40'
                  : 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 hover:from-purple-500 hover:via-pink-500 hover:to-red-400 shadow-purple-500/25 hover:shadow-purple-500/40'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {t('generate.generating')}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  {t('generate.button')}
                </>
              )}
            </Button>
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            <Card className={`backdrop-blur-xl shadow-2xl ${
              isPro 
                ? 'bg-gradient-to-br from-amber-900/10 to-orange-900/10 border-amber-500/20' 
                : 'bg-white/5 border-white/10'
            }`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <ImageIcon className={`w-4 h-4 ${isPro ? 'text-amber-400' : 'text-cyan-400'}`} />
                    {t('misc.preview')}
                  </span>
                  {generatedImage && (
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                      <Check className="w-3 h-3 mr-1" />
                      Ready
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center">
                  {generatedImage ? (
                    <img
                      src={generatedImage}
                      alt="Generated thumbnail"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-white/30">
                      <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-sm">{t('download.noImage')}</p>
                    </div>
                  )}
                </div>

                {/* Download buttons - Clear and visible */}
                <div className="mt-4 flex gap-3">
                  <Button
                    onClick={() => downloadImage('png')}
                    disabled={!generatedImage}
                    className={`flex-1 h-12 text-base font-semibold ${
                      isPro 
                        ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-lg'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg'
                    } disabled:opacity-50`}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    {t('download.png')}
                  </Button>
                  <Button
                    onClick={() => downloadImage('jpg')}
                    disabled={!generatedImage}
                    className={`flex-1 h-12 text-base font-semibold ${
                      isPro 
                        ? 'bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500 text-white shadow-lg'
                        : 'bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-500 hover:to-red-500 text-white shadow-lg'
                    } disabled:opacity-50`}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    {t('download.jpg')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className={`backdrop-blur-xl ${
              isPro 
                ? 'bg-gradient-to-br from-amber-900/10 to-orange-900/10 border-amber-500/20' 
                : 'bg-white/5 border-white/10'
            }`}>
              <CardContent className="pt-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className={`text-2xl font-bold bg-clip-text text-transparent ${
                      isPro 
                        ? 'bg-gradient-to-r from-amber-400 to-orange-400' 
                        : 'bg-gradient-to-r from-purple-400 to-pink-400'
                    }`}>
                      {isPro ? '20+' : '5'}
                    </div>
                    <div className="text-xs text-white/50">Styles</div>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold bg-clip-text text-transparent ${
                      isPro 
                        ? 'bg-gradient-to-r from-orange-400 to-yellow-400' 
                        : 'bg-gradient-to-r from-pink-400 to-red-400'
                    }`}>
                      ∞
                    </div>
                    <div className="text-xs text-white/50">{t('footer.credits')}</div>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold bg-clip-text text-transparent ${
                      isPro 
                        ? 'bg-gradient-to-r from-yellow-400 to-amber-400' 
                        : 'bg-gradient-to-r from-cyan-400 to-blue-400'
                    }`}>
                      {isPro ? '54' : '0'}
                    </div>
                    <div className="text-xs text-white/50">{t('pro.backgrounds')}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pro Free Notice Banner */}
            <Card className="bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-purple-900/30 border-purple-500/30 backdrop-blur-xl">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5 animate-pulse" />
                  <p className="text-sm text-white/80 leading-relaxed">
                    {t('footer.proNotice')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`relative z-10 border-t backdrop-blur-xl mt-8 ${
        isPro 
          ? 'border-amber-500/20 bg-gradient-to-r from-amber-900/10 via-gray-900/80 to-amber-900/10' 
          : 'border-white/10 bg-white/5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-2 text-white/50 text-sm">
            <span>{t('footer.madeWith')}</span>
            <span className="text-red-400">❤️</span>
            <span>{t('footer.by')}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <ThumbnailGenerator />
    </LanguageProvider>
  );
}
