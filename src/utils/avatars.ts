import { AvatarCustomConfig } from '../types';

export interface PresetAvatar {
  id: string;
  name: string;
  category: 'Photo' | 'Academic' | 'STEM' | 'Tech' | 'Mindset' | 'Arts';
  description: string;
  imageSrc?: string;
  config?: AvatarCustomConfig;
}

export interface AvatarFrame {
  id: 'none' | 'flame' | 'laurel' | 'crown' | 'neon' | 'scholar';
  name: string;
  description: string;
  icon: string;
  unlockRequirement: string;
}

export const DEFAULT_AVATAR_CONFIG: AvatarCustomConfig = {
  skinTone: '#FCD34D',
  hairStyle: 'short',
  hairColor: '#1F2937',
  expression: 'focused',
  clothing: 'hoodie',
  clothingColor: '#2563EB',
  accessory: 'glasses',
  backdrop: 'library',
  backdropColor: '#3B82F6',
};

export const AVATAR_SKIN_TONES = [
  { name: 'Warm Ivory', value: '#FEF3C7' },
  { name: 'Golden Honey', value: '#FCD34D' },
  { name: 'Warm Almond', value: '#F59E0B' },
  { name: 'Caramel Bronze', value: '#D97706' },
  { name: 'Chestnut Tan', value: '#B45309' },
  { name: 'Deep Espresso', value: '#78350F' },
  { name: 'Porcelain Peach', value: '#FDE68A' },
  { name: 'Cool Sand', value: '#E2E8F0' },
];

export const AVATAR_HAIR_STYLES = [
  { id: 'short', name: 'Classic Crop' },
  { id: 'fade', name: 'Modern Fade' },
  { id: 'wavy', name: 'Wavy Volume' },
  { id: 'curls', name: 'Curled Texture' },
  { id: 'ponytail', name: 'Study Ponytail' },
  { id: 'bun', name: 'Scholar Top Bun' },
  { id: 'long', name: 'Straight Flow' },
  { id: 'beanie', name: 'Focus Beanie' },
] as const;

export const AVATAR_HAIR_COLORS = [
  { name: 'Midnight Jet', value: '#111827' },
  { name: 'Deep Espresso', value: '#3B2F2F' },
  { name: 'Chestnut Brown', value: '#6B4226' },
  { name: 'Golden Blonde', value: '#F59E0B' },
  { name: 'Auburn Copper', value: '#B45309' },
  { name: 'Silver Platinum', value: '#94A3B8' },
  { name: 'Electric Cyan', value: '#06B6D4' },
  { name: 'Neon Violet', value: '#8B5CF6' },
];

export const AVATAR_EXPRESSIONS = [
  { id: 'focused', name: 'Deep Focus' },
  { id: 'happy', name: 'Cheer & Optimism' },
  { id: 'determined', name: 'Target Driven' },
  { id: 'zen', name: 'Calm Flow' },
  { id: 'glasses', name: 'Analytical Genius' },
] as const;

export const AVATAR_CLOTHING_STYLES = [
  { id: 'hoodie', name: 'Campus Hoodie' },
  { id: 'blazer', name: 'Academic Blazer' },
  { id: 'labcoat', name: 'STEM Lab Coat' },
  { id: 'tee', name: 'Minimalist Tee' },
  { id: 'sweater', name: 'Cozy Knit Sweater' },
  { id: 'varsity', name: 'Varsity Jacket' },
] as const;

export const AVATAR_CLOTHING_COLORS = [
  { name: 'Royal Blue', value: '#2563EB' },
  { name: 'Forest Emerald', value: '#059669' },
  { name: 'Deep Violet', value: '#7C3AED' },
  { name: 'Crimson Rose', value: '#E11D48' },
  { name: 'Amber Sunset', value: '#D97706' },
  { name: 'Dark Slate', value: '#334155' },
  { name: 'Clean White', value: '#F8FAFC' },
  { name: 'Charcoal Black', value: '#0F172A' },
];

export const AVATAR_ACCESSORIES = [
  { id: 'none', name: 'None' },
  { id: 'glasses', name: 'Square Glasses' },
  { id: 'roundGlasses', name: 'Round Specs' },
  { id: 'headphones', name: 'Noise-Cancelling Cans' },
  { id: 'gradCap', name: 'Graduation Cap' },
  { id: 'pencil', name: 'Study Pencil' },
  { id: 'coffee', name: 'Focus Espresso Cup' },
] as const;

export const AVATAR_BACKDROPS = [
  { id: 'library', name: 'Oak Library', color: '#1E3A8A' },
  { id: 'loft', name: 'Study Loft', color: '#0F766E' },
  { id: 'cyber', name: 'Focus Cyber Lab', color: '#4C1D95' },
  { id: 'garden', name: 'Campus Garden', color: '#065F46' },
  { id: 'sunset', name: 'Golden Hour Study', color: '#9A3412' },
  { id: 'minimal', name: 'Minimal Slate', color: '#334155' },
] as const;

export const AVATAR_FRAMES: AvatarFrame[] = [
  {
    id: 'none',
    name: 'Standard Border',
    description: 'Clean minimalist ring outline',
    icon: '⭕',
    unlockRequirement: 'Available to all students',
  },
  {
    id: 'flame',
    name: 'Streak Fire Ring',
    description: 'Animated golden ember aura',
    icon: '🔥',
    unlockRequirement: 'Reach a 3+ day study streak',
  },
  {
    id: 'laurel',
    name: 'Academic Laurel',
    description: 'Golden victory garland wreath',
    icon: '🌿',
    unlockRequirement: 'Complete 50%+ of subject day targets',
  },
  {
    id: 'crown',
    name: 'Deep Work Crown',
    description: 'Majestic monarch crown of focus',
    icon: '👑',
    unlockRequirement: 'Log 15+ weekly study hours',
  },
  {
    id: 'neon',
    name: 'Cyber Velocity Glow',
    description: 'Futuristic electric blue pulsed halo',
    icon: '⚡',
    unlockRequirement: 'Achieve 80%+ consistency score',
  },
  {
    id: 'scholar',
    name: 'Honor Medallion',
    description: 'Prestigious university seal ribbon',
    icon: '🎖️',
    unlockRequirement: 'Set up 3+ active subjects',
  },
];

export const AVATAR_PHOTO_FILTERS = [
  { id: 'normal', name: 'Normal', filterStyle: 'none' },
  { id: 'scholar', name: 'Crisp Scholar', filterStyle: 'contrast(1.15) brightness(1.05) saturate(1.1)' },
  { id: 'warm', name: 'Warm Desk Lamp', filterStyle: 'sepia(0.2) saturate(1.25) contrast(1.05)' },
  { id: 'noir', name: 'Midnight Noir', filterStyle: 'grayscale(1) contrast(1.3) brightness(0.95)' },
  { id: 'cyber', name: 'Neon Cyber', filterStyle: 'hue-rotate(210deg) saturate(1.4) contrast(1.1)' },
] as const;

export const AVATAR_ACCENT_COLORS = [
  { name: 'Electric Blue', value: '#2563eb' },
  { name: 'Emerald Green', value: '#059669' },
  { name: 'Royal Violet', value: '#7c3aed' },
  { name: 'Amber Gold', value: '#d97706' },
  { name: 'Rose Coral', value: '#e11d48' },
  { name: 'Cyan Wave', value: '#0891b2' },
  { name: 'Slate Steel', value: '#475569' },
  { name: 'Sunset Orange', value: '#ea580c' },
];

export const PRESET_AVATARS: PresetAvatar[] = [
  {
    id: 'photo_default',
    name: 'Student Portrait',
    category: 'Photo',
    description: 'Realistic modern student photo',
    imageSrc: '/student_avatar.jpg',
  },
  {
    id: 'scholar_grad',
    name: 'The Honors Graduate',
    category: 'Academic',
    description: 'Academic distinction & cap',
    config: {
      skinTone: '#FCD34D',
      hairStyle: 'short',
      hairColor: '#1F2937',
      expression: 'happy',
      clothing: 'blazer',
      clothingColor: '#1E3A8A',
      accessory: 'gradCap',
      backdrop: 'library',
      backdropColor: '#1E40AF',
    },
  },
  {
    id: 'stem_scientist',
    name: 'Biochem Researcher',
    category: 'STEM',
    description: 'Lab coat & research focus',
    config: {
      skinTone: '#FEF3C7',
      hairStyle: 'ponytail',
      hairColor: '#B45309',
      expression: 'focused',
      clothing: 'labcoat',
      clothingColor: '#F8FAFC',
      accessory: 'glasses',
      backdrop: 'loft',
      backdropColor: '#059669',
    },
  },
  {
    id: 'code_architect',
    name: 'Algorithm Specialist',
    category: 'Tech',
    description: 'Cyber headset & code mode',
    config: {
      skinTone: '#F59E0B',
      hairStyle: 'curls',
      hairColor: '#111827',
      expression: 'determined',
      clothing: 'hoodie',
      clothingColor: '#4C1D95',
      accessory: 'headphones',
      backdrop: 'cyber',
      backdropColor: '#581C87',
    },
  },
  {
    id: 'high_achiever',
    name: 'High-Velocity Striver',
    category: 'Mindset',
    description: 'Quick learner with coffee focus',
    config: {
      skinTone: '#FDE68A',
      hairStyle: 'fade',
      hairColor: '#F59E0B',
      expression: 'happy',
      clothing: 'varsity',
      clothingColor: '#EA580C',
      accessory: 'coffee',
      backdrop: 'sunset',
      backdropColor: '#C2410C',
    },
  },
  {
    id: 'deep_focus',
    name: 'Deep Work Flow',
    category: 'Mindset',
    description: 'Undivided focus in nature',
    config: {
      skinTone: '#D97706',
      hairStyle: 'bun',
      hairColor: '#1F2937',
      expression: 'zen',
      clothing: 'sweater',
      clothingColor: '#047857',
      accessory: 'headphones',
      backdrop: 'garden',
      backdropColor: '#064E3B',
    },
  },
  {
    id: 'polymath',
    name: 'Humanities Polymath',
    category: 'Academic',
    description: 'Round specs & classical literature',
    config: {
      skinTone: '#B45309',
      hairStyle: 'wavy',
      hairColor: '#6B4226',
      expression: 'glasses',
      clothing: 'sweater',
      clothingColor: '#991B1B',
      accessory: 'roundGlasses',
      backdrop: 'library',
      backdropColor: '#831843',
    },
  },
  {
    id: 'night_owl',
    name: 'Midnight Engineer',
    category: 'Tech',
    description: 'Beanie & nocturnal study sessions',
    config: {
      skinTone: '#FEF3C7',
      hairStyle: 'beanie',
      hairColor: '#111827',
      expression: 'focused',
      clothing: 'hoodie',
      clothingColor: '#0F172A',
      accessory: 'pencil',
      backdrop: 'cyber',
      backdropColor: '#1E293B',
    },
  },
  {
    id: 'med_specialist',
    name: 'Med Board Aspirant',
    category: 'STEM',
    description: 'Anatomy, stethoscope & clinical notes',
    config: {
      skinTone: '#78350F',
      hairStyle: 'fade',
      hairColor: '#111827',
      expression: 'determined',
      clothing: 'labcoat',
      clothingColor: '#F8FAFC',
      accessory: 'roundGlasses',
      backdrop: 'loft',
      backdropColor: '#0284C7',
    },
  },
  {
    id: 'creative_thinker',
    name: 'Visual & Design Scholar',
    category: 'Arts',
    description: 'Concept sketching & creative synthesis',
    config: {
      skinTone: '#FCD34D',
      hairStyle: 'long',
      hairColor: '#8B5CF6',
      expression: 'happy',
      clothing: 'tee',
      clothingColor: '#EC4899',
      accessory: 'pencil',
      backdrop: 'sunset',
      backdropColor: '#DB2777',
    },
  },
];

/**
 * Randomize avatar config generator
 */
export const generateRandomAvatarConfig = (): AvatarCustomConfig => {
  const randomPick = <T>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];
  const randomSkin = randomPick(AVATAR_SKIN_TONES).value;
  const randomHair = randomPick(AVATAR_HAIR_STYLES).id;
  const randomHairColor = randomPick(AVATAR_HAIR_COLORS).value;
  const randomExpr = randomPick(AVATAR_EXPRESSIONS).id;
  const randomCloth = randomPick(AVATAR_CLOTHING_STYLES).id;
  const randomClothCol = randomPick(AVATAR_CLOTHING_COLORS).value;
  const randomAcc = randomPick(AVATAR_ACCESSORIES).id;
  const randomBack = randomPick(AVATAR_BACKDROPS);

  return {
    skinTone: randomSkin,
    hairStyle: randomHair,
    hairColor: randomHairColor,
    expression: randomExpr,
    clothing: randomCloth,
    clothingColor: randomClothCol,
    accessory: randomAcc,
    backdrop: randomBack.id,
    backdropColor: randomBack.color,
  };
};

/**
 * Resizes an uploaded user image to a lightweight, crisp base64 data URL
 * to avoid exceeding browser LocalStorage limits.
 */
export const resizeImageToDataUrl = (file: File, maxDimension = 320): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      return reject(new Error('Selected file must be an image'));
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image element'));
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        const minDim = Math.min(width, height);
        const startX = (width - minDim) / 2;
        const startY = (height - minDim) / 2;

        const targetDim = Math.min(maxDimension, minDim);
        const canvas = document.createElement('canvas');
        canvas.width = targetDim;
        canvas.height = targetDim;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return resolve(reader.result as string);
        }

        ctx.drawImage(img, startX, startY, minDim, minDim, 0, 0, targetDim, targetDim);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
        resolve(dataUrl);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};
