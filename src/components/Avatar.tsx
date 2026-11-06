import React, { useState } from 'react';
import avatarPhotoFallback from '../assets/images/avatar_student_user_1793857596423.jpg';
import { Camera, Flame, Crown } from 'lucide-react';
import { AvatarCustomConfig } from '../types';
import { CustomVectorAvatar } from './CustomVectorAvatar';
import { DEFAULT_AVATAR_CONFIG, PRESET_AVATARS, AVATAR_PHOTO_FILTERS } from '../utils/avatars';

interface AvatarProps {
  name: string;
  avatarUrl?: string;
  avatarType?: 'preset' | 'custom' | 'initials' | 'builder';
  avatarConfig?: AvatarCustomConfig;
  avatarFrame?: 'none' | 'flame' | 'laurel' | 'crown' | 'neon' | 'scholar';
  avatarFilter?: 'normal' | 'scholar' | 'warm' | 'noir' | 'cyber';
  accentColor?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  editable?: boolean;
  onClick?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  avatarUrl = '/student_avatar.jpg',
  avatarType = 'preset',
  avatarConfig = DEFAULT_AVATAR_CONFIG,
  avatarFrame = 'none',
  avatarFilter = 'normal',
  accentColor,
  size = 'md',
  className = '',
  editable = false,
  onClick,
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-xs',
    lg: 'w-12 h-12 text-sm',
    xl: 'w-16 h-16 text-base',
    '2xl': 'w-24 h-24 text-xl',
  };

  const getInitials = (n: string) => {
    const parts = n.trim().split(/\s+/);
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return (n.slice(0, 2) || 'ST').toUpperCase();
  };

  // Check if current avatar matches a preset with its own vector config
  const matchedPreset = PRESET_AVATARS.find(
    (p) => p.id === avatarUrl || (p.imageSrc && p.imageSrc === avatarUrl)
  );

  const isPresetKey =
    avatarUrl &&
    !avatarUrl.startsWith('data:') &&
    !avatarUrl.startsWith('/') &&
    !avatarUrl.startsWith('http');

  // Find photo filter style
  const activeFilterObj = AVATAR_PHOTO_FILTERS.find((f) => f.id === avatarFilter);
  const filterStyleCss = activeFilterObj ? { filter: activeFilterObj.filterStyle } : {};

  // Custom frame styling
  const frameRingClasses: Record<string, string> = {
    none: '',
    flame: 'ring-3 ring-amber-500 shadow-md shadow-amber-500/30',
    laurel: 'ring-3 ring-emerald-500 shadow-md shadow-emerald-500/30',
    crown: 'ring-3 ring-yellow-400 shadow-md shadow-yellow-500/30',
    neon: 'ring-3 ring-cyan-400 shadow-md shadow-cyan-400/40 animate-pulse',
    scholar: 'ring-3 ring-indigo-600 shadow-md shadow-indigo-600/30',
  };

  const ringStyle =
    avatarFrame === 'none' && accentColor
      ? { boxShadow: `0 0 0 2px white, 0 0 0 4px ${accentColor}` }
      : {};

  return (
    <div className={`relative shrink-0 inline-flex items-center justify-center ${sizeClasses[size]}`}>
      {/* Frame Badge Ornaments */}
      {avatarFrame === 'flame' && (
        <span
          className="absolute -top-1.5 -right-1 z-10 w-4 h-4 text-amber-500 flex items-center justify-center animate-bounce pointer-events-none drop-shadow"
          title="Streak Flame Frame"
        >
          🔥
        </span>
      )}
      {avatarFrame === 'crown' && (
        <span
          className="absolute -top-2.5 inset-x-0 flex justify-center z-10 pointer-events-none drop-shadow"
          title="Deep Work Crown"
        >
          <Crown className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
        </span>
      )}
      {avatarFrame === 'laurel' && (
        <span
          className="absolute -bottom-1 -left-1 z-10 text-xs pointer-events-none drop-shadow"
          title="Mastery Laurel"
        >
          🌿
        </span>
      )}
      {avatarFrame === 'scholar' && (
        <span
          className="absolute -bottom-1 -right-1 z-10 text-xs pointer-events-none drop-shadow"
          title="Honor Medallion"
        >
          🎖️
        </span>
      )}

      {/* Main Avatar Circular Base */}
      <div
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={(e) => {
          if (onClick && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick();
          }
        }}
        style={ringStyle}
        className={`w-full h-full relative group rounded-full overflow-hidden shrink-0 flex items-center justify-center font-bold select-none transition-transform active:scale-95 ${
          frameRingClasses[avatarFrame]
        } ${onClick ? 'cursor-pointer hover:ring-2 hover:ring-blue-400' : ''} ${
          avatarType === 'initials'
            ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white'
            : 'bg-slate-100 text-slate-700'
        } ${className}`}
        title={name}
      >
        {/* RENDER MODE 1: Custom Vector Builder or Preset with Vector Config */}
        {avatarType === 'builder' ? (
          <CustomVectorAvatar config={avatarConfig} />
        ) : matchedPreset && matchedPreset.config ? (
          <CustomVectorAvatar config={matchedPreset.config} />
        ) : avatarType === 'initials' ? (
          /* RENDER MODE 2: Minimalist Initials */
          <span>{getInitials(name)}</span>
        ) : !isPresetKey && !imageFailed ? (
          /* RENDER MODE 3: Uploaded / Default Photo Image with Filter */
          <img
            src={avatarUrl || avatarPhotoFallback}
            alt={name}
            style={filterStyleCss}
            className="w-full h-full object-cover transition-all"
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
          />
        ) : isPresetKey ? (
          /* RENDER MODE 4: Fallback vector config */
          <CustomVectorAvatar config={DEFAULT_AVATAR_CONFIG} />
        ) : (
          /* Fallback */
          <span className="text-white bg-blue-600 w-full h-full flex items-center justify-center">
            {getInitials(name)}
          </span>
        )}

        {/* Hover Camera icon when editable */}
        {editable && (
          <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
            <Camera className="w-3.5 h-3.5" />
          </div>
        )}
      </div>
    </div>
  );
};
