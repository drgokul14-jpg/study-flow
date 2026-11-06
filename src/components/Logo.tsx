import React, { useState } from 'react';
import logoImage from '../assets/images/studyflow_logo_mark_1793855795572.jpg';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  className = '',
  showText = true,
}) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xs flex items-center justify-center shrink-0 relative`}
      >
        {!hasError ? (
          <img
            src={logoImage}
            alt="StudyFlow Logo"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
          />
        ) : (
          /* High-Fidelity SVG Fallback matching the generated logo */
          <svg
            viewBox="0 0 64 64"
            className="w-full h-full p-1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            {/* Outer Progress Arcs */}
            <path
              d="M16 32 C16 18, 48 18, 48 32"
              stroke="url(#logoGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M22 32 C22 22, 42 22, 42 32"
              stroke="url(#logoGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Open Book Wings */}
            <path
              d="M14 46 L32 40 L50 46 L50 32 L32 26 L14 32 Z"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeLinejoin="round"
              fill="rgba(37, 99, 235, 0.15)"
            />
            {/* Center Spine */}
            <path d="M32 26 L32 40" stroke="#38bdf8" strokeWidth="2.5" />
            {/* Milestone Dot */}
            <circle cx="32" cy="17" r="2.5" fill="#10b981" />
          </svg>
        )}
      </div>

      {showText && (
        <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
          StudyFlow
        </span>
      )}
    </div>
  );
};
