'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'app.title': 'The Best Thumbnail Generator',
    'app.subtitle': 'Create stunning YouTube thumbnails with AI',
    'header.free': 'Free',
    'header.pro': 'Pro',
    'header.language': 'Language',

    // Title Input
    'title.label': 'Video Title',
    'title.placeholder': 'Enter your video title...',
    'title.chars': 'characters',
    'title.freeLimit': '30 char limit',
    'title.proLimit': '50 char limit',

    // Description
    'description.label': 'Describe Your Thumbnail',
    'description.placeholder': 'Describe how you want your thumbnail to look. Example: A person pointing excitedly at a gaming setup with neon lights and a surprised expression...',
    'description.hint': 'The more detailed, the better the result',

    // Styles
    'styles.title': 'Choose Style',
    'styles.dramatic': 'Dramatic',
    'styles.minimalist': 'Minimalist',
    'styles.explosive': 'Explosive',
    'styles.professional': 'Professional',
    'styles.neon': 'Neon',
    'styles.cinematic': 'Cinematic',
    'styles.gaming': 'Gaming',
    'styles.retro': 'Retro',
    'styles.tech': 'Tech',
    'styles.cartoon': 'Cartoon',
    'styles.horror': 'Horror',
    'styles.anime': 'Anime',
    'styles.vintage': 'Vintage',
    'styles.graffiti': 'Graffiti',
    'styles.scifi': 'Sci-Fi',
    'styles.popart': 'Pop Art',
    'styles.darkmode': 'Dark Mode',
    'styles.pastel': 'Pastel',
    'styles.cyberpunk': 'Cyberpunk',
    'styles.handdrawn': 'Hand Drawn',
    'styles.3d': '3D Render',
    'styles.watercolor': 'Watercolor',

    // Pro Features
    'pro.title': 'Pro Features',
    'pro.backgrounds': 'Backgrounds',
    'pro.backgrounds.textures': 'Textures',
    'pro.backgrounds.realistic': 'Realistic',
    'pro.backgrounds.illustrated': 'Illustrated',
    'pro.backgrounds.colors': 'Colors',
    'pro.backgrounds.abstract': 'Abstract',
    'pro.backgrounds.viral': 'Viral',

    'pro.colors': 'Custom Colors',
    'pro.colors.add': 'Add Color',
    'pro.colors.selected': 'Selected',
    'pro.colors.blendModes': 'Blend Mode',
    'pro.colors.presets': 'Color Presets',

    'pro.fonts': 'Fonts',
    'pro.fonts.impact': 'Impact',
    'pro.fonts.bebas': 'Bebas',
    'pro.fonts.oswald': 'Oswald',
    'pro.fonts.montserrat': 'Montserrat',
    'pro.fonts.roboto': 'Roboto',
    'pro.fonts.playfair': 'Playfair',

    'pro.fontSizes': 'Size',
    'pro.fontSizes.small': 'S',
    'pro.fontSizes.medium': 'M',
    'pro.fontSizes.large': 'L',

    'pro.fontPreview': 'Title Preview',

    'pro.formats': 'Viral Formats',
    'pro.formats.reaction': 'Reaction',
    'pro.formats.comparison': 'Comparison',
    'pro.formats.numbered': 'Numbered',
    'pro.formats.arrow': 'Arrow',
    'pro.formats.circle': 'Circle',
    'pro.formats.split': 'Split',
    'pro.formats.zoom': 'Zoom',
    'pro.formats.question': 'Question',
    'pro.formats.shocked': 'Shocked',
    'pro.formats.money': 'Money',
    'pro.formats.warning': 'Warning',
    'pro.formats.secret': 'Secret',
    'pro.formats.trending': 'Trending',
    'pro.formats.new': 'NEW',
    'pro.formats.giveaway': 'Giveaway',

    'pro.character': 'Character',
    'pro.character.enable': 'Enable',
    'pro.character.type': 'Character Type',
    'pro.character.showOptions': 'Show Options',
    'pro.character.hideOptions': 'Hide Options',
    'pro.character.gender': 'Gender',
    'pro.character.gender.male': 'Male',
    'pro.character.gender.female': 'Female',
    'pro.character.gender.other': 'Other',
    'pro.character.age': 'Age',
    'pro.character.age.child': 'Child',
    'pro.character.age.young-adult': 'Young Adult',
    'pro.character.age.adult': 'Adult',
    'pro.character.age.senior': 'Senior',
    'pro.character.pose': 'Pose',
    'pro.character.pose.standing': 'Standing',
    'pro.character.pose.sitting': 'Sitting',
    'pro.character.pose.pointing': 'Pointing',
    'pro.character.pose.thinking': 'Thinking',
    'pro.character.pose.excited': 'Excited',
    'pro.character.pose.waving': 'Waving',
    'pro.character.expression': 'Expression',
    'pro.character.expression.happy': 'Happy',
    'pro.character.expression.surprised': 'Surprised',
    'pro.character.expression.thinking': 'Thinking',
    'pro.character.expression.shocked': 'Shocked',
    'pro.character.expression.confident': 'Confident',
    'pro.character.expression.sad': 'Sad',
    'pro.character.expression.angry': 'Angry',
    'pro.character.outfit': 'Outfit',
    'pro.character.outfit.casual': 'Casual',
    'pro.character.outfit.formal': 'Formal',
    'pro.character.outfit.sporty': 'Sporty',
    'pro.character.outfit.gaming': 'Gaming',
    'pro.character.outfit.tech': 'Tech',
    'pro.character.outfit.fantasy': 'Fantasy',
    'pro.character.accessories': 'Accessories',
    'pro.character.accessories.none': 'None',
    'pro.character.accessories.glasses': 'Glasses',
    'pro.character.accessories.headphones': 'Headphones',
    'pro.character.accessories.hat': 'Hat',
    'pro.character.accessories.watch': 'Watch',
    'pro.character.accessories.jewelry': 'Jewelry',
    'pro.character.hairStyle': 'Hair Style',
    'pro.character.hairStyle.short': 'Short',
    'pro.character.hairStyle.medium': 'Medium',
    'pro.character.hairStyle.long': 'Long',
    'pro.character.hairStyle.bald': 'Bald',
    'pro.character.hairStyle.curly': 'Curly',
    'pro.character.hairStyle.ponytail': 'Ponytail',
    'pro.character.hairColor': 'Hair Color',

    'pro.promptPreview': 'Generated Prompt',
    'pro.promptPlaceholder': 'Configure your options and generate to see the prompt...',

    // Generate Button
    'generate.button': 'Generate Thumbnail',
    'generate.generating': 'Generating...',
    'generate.success': 'Thumbnail generated successfully!',
    'generate.error': 'Error generating thumbnail. Please try again.',

    // Download
    'download.title': 'Download',
    'download.png': 'Download PNG',
    'download.jpg': 'Download JPG',
    'download.noImage': 'No image generated yet',

    // Footer
    'footer.madeWith': 'Made with',
    'footer.by': 'by AI',
    'footer.credits': 'Unlimited',
    'footer.proNotice': 'PRO version features will be available for FREE until further notice. With your support we can keep PRO features active for everyone!',

    // Blend Modes
    'blend.normal': 'Normal',
    'blend.multiply': 'Multiply',
    'blend.screen': 'Screen',
    'blend.overlay': 'Overlay',
    'blend.darken': 'Darken',
    'blend.lighten': 'Lighten',

    // Misc
    'misc.selectStyle': 'Select a style',
    'misc.preview': 'Preview',
    'misc.loading': 'Loading...',
    'misc.or': 'or',
  },
  es: {
    // Header
    'app.title': 'El Mejor Generador de Miniaturas',
    'app.subtitle': 'Crea miniaturas impactantes para YouTube con IA',
    'header.free': 'Gratis',
    'header.pro': 'Pro',
    'header.language': 'Idioma',

    // Title Input
    'title.label': 'Título del Video',
    'title.placeholder': 'Ingresa el título de tu video...',
    'title.chars': 'caracteres',
    'title.freeLimit': 'Límite 30 caracteres',
    'title.proLimit': 'Límite 50 caracteres',

    // Description
    'description.label': 'Describe Tu Miniatura',
    'description.placeholder': 'Describe cómo quieres que se vea tu miniatura. Ejemplo: Una persona señalando emocionadamente un setup de gaming con luces neón y expresión sorprendida...',
    'description.hint': 'Cuanto más detallado, mejor será el resultado',

    // Styles
    'styles.title': 'Elige Estilo',
    'styles.dramatic': 'Dramático',
    'styles.minimalist': 'Minimalista',
    'styles.explosive': 'Explosivo',
    'styles.professional': 'Profesional',
    'styles.neon': 'Neón',
    'styles.cinematic': 'Cinematográfico',
    'styles.gaming': 'Gaming',
    'styles.retro': 'Retro',
    'styles.tech': 'Tecnología',
    'styles.cartoon': 'Caricatura',
    'styles.horror': 'Terror',
    'styles.anime': 'Anime',
    'styles.vintage': 'Vintage',
    'styles.graffiti': 'Grafiti',
    'styles.scifi': 'Ciencia Ficción',
    'styles.popart': 'Arte Pop',
    'styles.darkmode': 'Modo Oscuro',
    'styles.pastel': 'Pastel',
    'styles.cyberpunk': 'Cyberpunk',
    'styles.handdrawn': 'Dibujado a Mano',
    'styles.3d': 'Render 3D',
    'styles.watercolor': 'Acuarela',

    // Pro Features
    'pro.title': 'Funciones Pro',
    'pro.backgrounds': 'Fondos',
    'pro.backgrounds.textures': 'Texturas',
    'pro.backgrounds.realistic': 'Realistas',
    'pro.backgrounds.illustrated': 'Ilustrados',
    'pro.backgrounds.colors': 'Colores',
    'pro.backgrounds.abstract': 'Abstracto',
    'pro.backgrounds.viral': 'Virales',

    'pro.colors': 'Colores Personalizados',
    'pro.colors.add': 'Añadir Color',
    'pro.colors.selected': 'Seleccionados',
    'pro.colors.blendModes': 'Modo de Mezcla',
    'pro.colors.presets': 'Preajustes de Color',

    'pro.fonts': 'Fuentes',
    'pro.fonts.impact': 'Impact',
    'pro.fonts.bebas': 'Bebas',
    'pro.fonts.oswald': 'Oswald',
    'pro.fonts.montserrat': 'Montserrat',
    'pro.fonts.roboto': 'Roboto',
    'pro.fonts.playfair': 'Playfair',

    'pro.fontSizes': 'Tamaño',
    'pro.fontSizes.small': 'P',
    'pro.fontSizes.medium': 'M',
    'pro.fontSizes.large': 'G',

    'pro.fontPreview': 'Vista Previa del Título',

    'pro.formats': 'Formatos Virales',
    'pro.formats.reaction': 'Reacción',
    'pro.formats.comparison': 'Comparación',
    'pro.formats.numbered': 'Numerado',
    'pro.formats.arrow': 'Flecha',
    'pro.formats.circle': 'Círculo',
    'pro.formats.split': 'Dividido',
    'pro.formats.zoom': 'Zoom',
    'pro.formats.question': 'Pregunta',
    'pro.formats.shocked': 'Sorprendido',
    'pro.formats.money': 'Dinero',
    'pro.formats.warning': 'Advertencia',
    'pro.formats.secret': 'Secreto',
    'pro.formats.trending': 'Tendencia',
    'pro.formats.new': 'NUEVO',
    'pro.formats.giveaway': 'Sorteo',

    'pro.character': 'Personaje',
    'pro.character.enable': 'Activar',
    'pro.character.type': 'Tipo de Personaje',
    'pro.character.showOptions': 'Mostrar Opciones',
    'pro.character.hideOptions': 'Ocultar Opciones',
    'pro.character.gender': 'Género',
    'pro.character.gender.male': 'Masculino',
    'pro.character.gender.female': 'Femenino',
    'pro.character.gender.other': 'Otro',
    'pro.character.age': 'Edad',
    'pro.character.age.child': 'Niño',
    'pro.character.age.young-adult': 'Joven Adulto',
    'pro.character.age.adult': 'Adulto',
    'pro.character.age.senior': 'Mayor',
    'pro.character.pose': 'Postura',
    'pro.character.pose.standing': 'De Pie',
    'pro.character.pose.sitting': 'Sentado',
    'pro.character.pose.pointing': 'Señalando',
    'pro.character.pose.thinking': 'Pensando',
    'pro.character.pose.excited': 'Emocionado',
    'pro.character.pose.waving': 'Saludando',
    'pro.character.expression': 'Expresión',
    'pro.character.expression.happy': 'Feliz',
    'pro.character.expression.surprised': 'Sorprendido',
    'pro.character.expression.thinking': 'Pensativo',
    'pro.character.expression.shocked': 'Impactado',
    'pro.character.expression.confident': 'Confiado',
    'pro.character.expression.sad': 'Triste',
    'pro.character.expression.angry': 'Enojado',
    'pro.character.outfit': 'Vestimenta',
    'pro.character.outfit.casual': 'Casual',
    'pro.character.outfit.formal': 'Formal',
    'pro.character.outfit.sporty': 'Deportivo',
    'pro.character.outfit.gaming': 'Gaming',
    'pro.character.outfit.tech': 'Tecnológico',
    'pro.character.outfit.fantasy': 'Fantasía',
    'pro.character.accessories': 'Accesorios',
    'pro.character.accessories.none': 'Ninguno',
    'pro.character.accessories.glasses': 'Lentes',
    'pro.character.accessories.headphones': 'Audífonos',
    'pro.character.accessories.hat': 'Sombrero',
    'pro.character.accessories.watch': 'Reloj',
    'pro.character.accessories.jewelry': 'Joyería',
    'pro.character.hairStyle': 'Estilo de Pelo',
    'pro.character.hairStyle.short': 'Corto',
    'pro.character.hairStyle.medium': 'Medio',
    'pro.character.hairStyle.long': 'Largo',
    'pro.character.hairStyle.bald': 'Calvo',
    'pro.character.hairStyle.curly': 'Rizado',
    'pro.character.hairStyle.ponytail': 'Coleta',
    'pro.character.hairColor': 'Color de Pelo',

    'pro.promptPreview': 'Prompt Generado',
    'pro.promptPlaceholder': 'Configura tus opciones y genera para ver el prompt...',

    // Generate Button
    'generate.button': 'Generar Miniatura',
    'generate.generating': 'Generando...',
    'generate.success': '¡Miniatura generada exitosamente!',
    'generate.error': 'Error al generar la miniatura. Por favor intenta de nuevo.',

    // Download
    'download.title': 'Descargar',
    'download.png': 'Descargar PNG',
    'download.jpg': 'Descargar JPG',
    'download.noImage': 'Aún no hay imagen generada',

    // Footer
    'footer.madeWith': 'Hecho con',
    'footer.by': 'por IA',
    'footer.credits': 'Ilimitado',
    'footer.proNotice': 'Las Funciones de la versión PRO estarán disponibles de manera GRATUITA hasta nuevo aviso. Con tu apoyo podemos seguir manteniendo las funciones PRO activas para todos!',

    // Blend Modes
    'blend.normal': 'Normal',
    'blend.multiply': 'Multiplicar',
    'blend.screen': 'Trama',
    'blend.overlay': 'Superponer',
    'blend.darken': 'Oscurecer',
    'blend.lighten': 'Aclarar',

    // Misc
    'misc.selectStyle': 'Selecciona un estilo',
    'misc.preview': 'Vista previa',
    'misc.loading': 'Cargando...',
    'misc.or': 'o',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = useCallback((key: string): string => {
    return translations[language][key] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export type { Language };
