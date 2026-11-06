import React from 'react';
import { AvatarCustomConfig } from '../types';

interface CustomVectorAvatarProps {
  config: AvatarCustomConfig;
  className?: string;
}

export const CustomVectorAvatar: React.FC<CustomVectorAvatarProps> = ({
  config,
  className = 'w-full h-full',
}) => {
  const {
    skinTone,
    hairStyle,
    hairColor,
    expression,
    clothing,
    clothingColor,
    accessory,
    backdropColor,
  } = config;

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <clipPath id="circleClip">
          <circle cx="50" cy="50" r="49" />
        </clipPath>

        {/* Ambient backdrop gradient */}
        <radialGradient id="bgGlow" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
        </radialGradient>

        {/* Hair gradient for depth */}
        <linearGradient id="hairGrad" x1="0" y1="0" x2="0" y2="100">
          <stop offset="0%" stopColor={hairColor} />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
        </linearGradient>

        {/* Shadow */}
        <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodOpacity="0.18" />
        </filter>
      </defs>

      <g clipPath="url(#circleClip)">
        {/* 1. Backdrop Background */}
        <rect width="100" height="100" fill={backdropColor || '#2563EB'} />
        <rect width="100" height="100" fill="url(#bgGlow)" />

        {/* Subtle environment shapes */}
        {config.backdrop === 'library' && (
          <g opacity="0.18" stroke="#FFFFFF" strokeWidth="1">
            <line x1="10" y1="20" x2="90" y2="20" />
            <line x1="10" y1="36" x2="90" y2="36" />
            <rect x="18" y="8" width="8" height="12" fill="#FFFFFF" fillOpacity="0.2" />
            <rect x="28" y="10" width="6" height="10" fill="#FFFFFF" fillOpacity="0.2" />
            <rect x="70" y="7" width="9" height="13" fill="#FFFFFF" fillOpacity="0.2" />
          </g>
        )}

        {config.backdrop === 'cyber' && (
          <g opacity="0.15" stroke="#38BDF8" strokeWidth="0.8">
            <line x1="0" y1="30" x2="100" y2="30" />
            <line x1="0" y1="60" x2="100" y2="60" />
            <line x1="30" y1="0" x2="30" y2="100" />
            <line x1="70" y1="0" x2="70" y2="100" />
            <circle cx="50" cy="50" r="28" strokeDasharray="3 3" />
          </g>
        )}

        {config.backdrop === 'garden' && (
          <g opacity="0.2" fill="#A7F3D0">
            <circle cx="15" cy="18" r="10" />
            <circle cx="85" cy="22" r="12" />
            <path d="M40 10C45 6 55 6 60 10C55 14 45 14 40 10Z" />
          </g>
        )}

        {/* 2. Hair Back (for long hair, ponytail, or big curls) */}
        {hairStyle === 'long' && (
          <path
            d="M24 38C24 38 18 60 20 85C21 89 31 89 32 85C34 68 34 50 34 50L66 50C66 50 66 68 68 85C69 89 79 89 80 85C82 60 76 38 76 38Z"
            fill={hairColor}
          />
        )}
        {hairStyle === 'ponytail' && (
          <path
            d="M60 30C66 28 78 32 82 45C84 52 82 62 76 66C72 63 74 52 72 45C70 40 64 36 60 30Z"
            fill={hairColor}
          />
        )}
        {hairStyle === 'curls' && (
          <g fill={hairColor}>
            <circle cx="24" cy="42" r="9" />
            <circle cx="22" cy="54" r="8" />
            <circle cx="76" cy="42" r="9" />
            <circle cx="78" cy="54" r="8" />
          </g>
        )}

        {/* 3. Neck & Shadow */}
        <rect x="44" y="55" width="12" height="15" rx="3" fill={skinTone} />
        <path
          d="M44 57C47 61 53 61 56 57V63H44V57Z"
          fill="#000000"
          fillOpacity="0.12"
        />

        {/* 4. Torso & Clothing */}
        <g filter="url(#subtleShadow)">
          {/* Base Shoulders */}
          <path
            d="M18 96C18 78 30 70 50 70C70 70 82 78 82 96V100H18V96Z"
            fill={clothingColor || '#2563EB'}
          />

          {/* Clothing Specific Details */}
          {clothing === 'hoodie' && (
            <g>
              {/* Hoodie pocket & collar folds */}
              <path
                d="M40 70C43 78 47 82 50 82C53 82 57 78 60 70"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M45 80L44 91M55 80L56 91"
                stroke="#FFFFFF"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <circle cx="44" cy="92" r="1.5" fill="#E2E8F0" />
              <circle cx="56" cy="92" r="1.5" fill="#E2E8F0" />
            </g>
          )}

          {clothing === 'blazer' && (
            <g>
              {/* White collar shirt underneath */}
              <polygon points="44,70 56,70 50,79" fill="#FFFFFF" />
              {/* Necktie */}
              <polygon points="48,72 52,72 53,88 50,91 47,88" fill="#DC2626" />
              {/* Lapels */}
              <path
                d="M32 70L46 86L38 100M68 70L54 86L62 100"
                stroke="#0F172A"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          )}

          {clothing === 'labcoat' && (
            <g>
              {/* Lapels */}
              <path
                d="M36 70L48 84V100M64 70L52 84V100"
                stroke="#94A3B8"
                strokeWidth="2"
              />
              {/* Pocket with pen */}
              <rect x="26" y="82" width="12" height="10" rx="1.5" fill="#E2E8F0" />
              <line x1="30" y1="80" x2="30" y2="84" stroke="#2563EB" strokeWidth="2" />
              <line x1="34" y1="79" x2="34" y2="84" stroke="#DC2626" strokeWidth="2" />
            </g>
          )}

          {clothing === 'tee' && (
            <path
              d="M42 70C44 75 56 75 58 70"
              stroke="#000000"
              strokeOpacity="0.2"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}

          {clothing === 'sweater' && (
            <g>
              <path
                d="M40 70C42 74 58 74 60 70"
                stroke="#FFFFFF"
                strokeOpacity="0.4"
                strokeWidth="3"
                strokeDasharray="2 1"
              />
              <line x1="30" y1="84" x2="70" y2="84" stroke="#FFFFFF" strokeOpacity="0.15" strokeWidth="1" />
              <line x1="26" y1="92" x2="74" y2="92" stroke="#FFFFFF" strokeOpacity="0.15" strokeWidth="1" />
            </g>
          )}

          {clothing === 'varsity' && (
            <g>
              {/* White sleeves */}
              <path d="M18 96C18 84 25 76 30 73L35 100H18V96Z" fill="#F8FAFC" />
              <path d="M82 96C82 84 75 76 70 73L65 100H82V96Z" fill="#F8FAFC" />
              {/* Buttons */}
              <circle cx="50" cy="78" r="1.5" fill="#FDE047" />
              <circle cx="50" cy="86" r="1.5" fill="#FDE047" />
              <circle cx="50" cy="94" r="1.5" fill="#FDE047" />
            </g>
          )}
        </g>

        {/* 5. Ears */}
        <circle cx="28" cy="46" r="5" fill={skinTone} />
        <circle cx="28" cy="46" r="2.5" fill="#000000" fillOpacity="0.1" />
        <circle cx="72" cy="46" r="5" fill={skinTone} />
        <circle cx="72" cy="46" r="2.5" fill="#000000" fillOpacity="0.1" />

        {/* 6. Head Shape */}
        <g filter="url(#subtleShadow)">
          <path
            d="M30 42C30 26 38 18 50 18C62 18 70 26 70 42C70 54 62 62 50 62C38 62 30 54 30 42Z"
            fill={skinTone}
          />
        </g>

        {/* 7. Facial Features & Expression */}
        {/* Eyebrows */}
        {expression === 'focused' && (
          <g stroke="#1F2937" strokeWidth="1.8" strokeLinecap="round">
            <line x1="37" y1="35" x2="45" y2="37" />
            <line x1="63" y1="35" x2="55" y2="37" />
          </g>
        )}
        {expression === 'happy' && (
          <g stroke="#1F2937" strokeWidth="1.8" strokeLinecap="round">
            <path d="M37 36C40 34 44 34 46 36" />
            <path d="M54 36C56 34 60 34 63 36" />
          </g>
        )}
        {expression === 'determined' && (
          <g stroke="#1F2937" strokeWidth="2" strokeLinecap="round">
            <line x1="36" y1="37" x2="45" y2="35" />
            <line x1="64" y1="37" x2="55" y2="35" />
          </g>
        )}
        {(expression === 'zen' || expression === 'glasses') && (
          <g stroke="#1F2937" strokeWidth="1.6" strokeLinecap="round">
            <line x1="37" y1="36" x2="45" y2="36" />
            <line x1="55" y1="36" x2="63" y2="36" />
          </g>
        )}

        {/* Eyes */}
        {expression === 'zen' ? (
          <g stroke="#1F2937" strokeWidth="2" strokeLinecap="round">
            <path d="M38 42C40 44 44 44 46 42" />
            <path d="M54 42C56 44 60 44 62 42" />
          </g>
        ) : expression === 'happy' ? (
          <g stroke="#1F2937" strokeWidth="2" strokeLinecap="round">
            <path d="M38 43C40 40 44 40 46 43" />
            <path d="M54 43C56 40 60 40 62 43" />
          </g>
        ) : (
          <g fill="#1F2937">
            <ellipse cx="42" cy="42" rx="2.5" ry="3.2" />
            <circle cx="43" cy="41" r="1" fill="#FFFFFF" />
            <ellipse cx="58" cy="42" rx="2.5" ry="3.2" />
            <circle cx="59" cy="41" r="1" fill="#FFFFFF" />
          </g>
        )}

        {/* Cheeks / Blush */}
        <ellipse cx="36" cy="46" rx="3" ry="1.5" fill="#EF4444" fillOpacity="0.25" />
        <ellipse cx="64" cy="46" rx="3" ry="1.5" fill="#EF4444" fillOpacity="0.25" />

        {/* Nose */}
        <path d="M49 43C49 46 51 47 52 47" stroke="#000000" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" />

        {/* Mouth */}
        {expression === 'happy' ? (
          <path d="M44 51C47 56 53 56 56 51" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
        ) : expression === 'determined' ? (
          <path d="M44 52C47 50 53 50 56 52" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
        ) : (
          <path d="M45 52H55" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
        )}

        {/* 8. Front Hairstyle */}
        <g fill={hairColor}>
          {hairStyle === 'short' && (
            <path
              d="M30 36C30 22 38 15 50 15C62 15 70 22 70 36C65 32 58 30 50 32C42 30 35 32 30 36Z"
            />
          )}

          {hairStyle === 'fade' && (
            <g>
              <path d="M32 30C34 20 42 16 50 16C58 16 66 20 68 30C62 26 58 24 50 24C42 24 38 26 32 30Z" />
              <rect x="29" y="32" width="4" height="14" fill={hairColor} fillOpacity="0.4" />
              <rect x="67" y="32" width="4" height="14" fill={hairColor} fillOpacity="0.4" />
            </g>
          )}

          {hairStyle === 'wavy' && (
            <path
              d="M28 38C26 22 36 14 50 14C64 14 74 22 72 38C68 28 60 26 50 28C40 26 32 28 28 38Z"
            />
          )}

          {hairStyle === 'curls' && (
            <g>
              <circle cx="34" cy="22" r="7" />
              <circle cx="44" cy="18" r="8" />
              <circle cx="56" cy="18" r="8" />
              <circle cx="66" cy="22" r="7" />
              <circle cx="50" cy="24" r="6" />
            </g>
          )}

          {hairStyle === 'bun' && (
            <g>
              <circle cx="50" cy="11" r="9" />
              <ellipse cx="50" cy="17" rx="5" ry="2" fill="#F59E0B" />
              <path d="M30 36C30 22 38 18 50 18C62 18 70 22 70 36C64 30 58 28 50 30C42 28 36 30 30 36Z" />
            </g>
          )}

          {hairStyle === 'ponytail' && (
            <path
              d="M30 36C30 22 38 17 50 17C62 17 70 22 70 36C64 28 58 26 50 28C42 26 36 28 30 36Z"
            />
          )}

          {hairStyle === 'long' && (
            <g>
              <path d="M30 36C30 20 38 16 50 16C62 16 70 20 70 36C64 28 58 26 50 28C42 26 36 28 30 36Z" />
              <path d="M26 40C26 52 28 64 31 72C33 72 34 60 34 44L26 40Z" />
              <path d="M74 40C74 52 72 64 69 72C67 72 66 60 66 44L74 40Z" />
            </g>
          )}

          {hairStyle === 'beanie' && (
            <g>
              {/* Beanie Hat Dome */}
              <path
                d="M26 34C26 18 36 12 50 12C64 12 74 18 74 34H26Z"
                fill="#DC2626"
              />
              {/* Folded Brim */}
              <rect x="24" y="30" width="52" height="7" rx="3" fill="#B91C1C" />
              <line x1="30" y1="30" x2="30" y2="37" stroke="#7F1D1D" strokeWidth="1" />
              <line x1="40" y1="30" x2="40" y2="37" stroke="#7F1D1D" strokeWidth="1" />
              <line x1="50" y1="30" x2="50" y2="37" stroke="#7F1D1D" strokeWidth="1" />
              <line x1="60" y1="30" x2="60" y2="37" stroke="#7F1D1D" strokeWidth="1" />
              <line x1="70" y1="30" x2="70" y2="37" stroke="#7F1D1D" strokeWidth="1" />
            </g>
          )}
        </g>

        {/* 9. Accessories Layer */}
        {accessory === 'glasses' && (
          <g stroke="#1F2937" strokeWidth="2.5" fill="none">
            {/* Left Frame */}
            <rect x="34" y="37" width="13" height="10" rx="2" fill="#FFFFFF" fillOpacity="0.2" />
            {/* Right Frame */}
            <rect x="53" y="37" width="13" height="10" rx="2" fill="#FFFFFF" fillOpacity="0.2" />
            {/* Bridge */}
            <line x1="47" y1="41" x2="53" y2="41" />
            {/* Glint */}
            <line x1="36" y1="39" x2="40" y2="39" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="55" y1="39" x2="59" y2="39" stroke="#FFFFFF" strokeWidth="1.5" />
          </g>
        )}

        {accessory === 'roundGlasses' && (
          <g stroke="#D97706" strokeWidth="2" fill="none">
            <circle cx="41" cy="42" r="6" fill="#FFFFFF" fillOpacity="0.15" />
            <circle cx="59" cy="42" r="6" fill="#FFFFFF" fillOpacity="0.15" />
            <path d="M47 42C49 40 51 40 53 42" />
          </g>
        )}

        {accessory === 'headphones' && (
          <g>
            {/* Headband */}
            <path
              d="M26 44C26 22 36 16 50 16C64 16 74 22 74 44"
              stroke="#0F172A"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* Earcups */}
            <rect x="23" y="38" width="6" height="14" rx="3" fill="#2563EB" stroke="#1E293B" strokeWidth="1.5" />
            <rect x="71" y="38" width="6" height="14" rx="3" fill="#2563EB" stroke="#1E293B" strokeWidth="1.5" />
          </g>
        )}

        {accessory === 'gradCap' && (
          <g>
            {/* Mortarboard Diamond */}
            <polygon points="50,14 78,22 50,30 22,22" fill="#0F172A" stroke="#1E293B" strokeWidth="1" />
            {/* Cap Skull Underneath */}
            <path d="M34 26C34 26 42 32 50 32C58 32 66 26 66 26V32C66 34 58 36 50 36C42 36 34 34 34 32V26Z" fill="#1E293B" />
            {/* Gold Tassel */}
            <circle cx="50" cy="22" r="2" fill="#FDE047" />
            <path d="M50 22L68 28V36" stroke="#FDE047" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <circle cx="68" cy="37" r="1.5" fill="#FDE047" />
          </g>
        )}

        {accessory === 'pencil' && (
          <g transform="rotate(-30 72 38)">
            <rect x="70" y="30" width="4" height="20" rx="1" fill="#F59E0B" />
            <polygon points="70,50 74,50 72,55" fill="#FEF3C7" />
            <polygon points="71,53 73,53 72,55" fill="#1F2937" />
            <rect x="70" y="28" width="4" height="3" fill="#EC4899" />
          </g>
        )}

        {accessory === 'coffee' && (
          <g transform="translate(68, 76)">
            {/* Steam */}
            <path d="M6 -5C5 -8 7 -10 6 -13" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="1" strokeLinecap="round" fill="none" />
            <path d="M10 -4C9 -7 11 -9 10 -12" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="1" strokeLinecap="round" fill="none" />
            {/* Ceramic Mug */}
            <rect x="2" y="-2" width="13" height="15" rx="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
            <path d="M15 2C18 2 18 9 15 9" stroke="#CBD5E1" strokeWidth="1.8" fill="none" />
            <rect x="4" y="2" width="9" height="7" rx="1" fill="#F59E0B" />
          </g>
        )}
      </g>
    </svg>
  );
};
