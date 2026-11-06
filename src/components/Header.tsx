import React from 'react';
import { BookOpen, Calendar, Clock, FileDown, Plus, Sparkles } from 'lucide-react';
import { Logo } from './Logo';

import { Avatar } from './Avatar';
import { AvatarCustomConfig } from '../types';

export type ActiveTab = 'dashboard' | 'subjects' | 'patterns' | 'sessions';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenLogModal: () => void;
  onOpenTimerModal: () => void;
  onOpenReportModal: () => void;
  onOpenChatbot: () => void;
  onOpenAvatarModal?: () => void;
  currentStreak: number;
  studentName?: string;
  avatarUrl?: string;
  avatarType?: 'preset' | 'custom' | 'initials' | 'builder';
  avatarAccentColor?: string;
  avatarConfig?: AvatarCustomConfig;
  avatarFrame?: 'none' | 'flame' | 'laurel' | 'crown' | 'neon' | 'scholar';
  avatarFilter?: 'normal' | 'scholar' | 'warm' | 'noir' | 'cyber';
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenLogModal,
  onOpenTimerModal,
  onOpenReportModal,
  onOpenChatbot,
  onOpenAvatarModal,
  currentStreak,
  studentName = 'Student',
  avatarUrl,
  avatarType,
  avatarAccentColor,
  avatarConfig,
  avatarFrame,
  avatarFilter,
}) => {
  return (
    <header className="no-print sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
          >
            <Logo size="md" showText={true} />
          </button>

          {/* Quick Streak indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200/70 rounded-md text-xs font-semibold text-amber-800 tabular-nums">
            <span className="text-amber-600">⚡</span>
            <span>{currentStreak} Day Streak</span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'dashboard'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onSelectTab('subjects')}
            className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'subjects'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Subjects & Day Targets
          </button>
          <button
            onClick={() => onSelectTab('patterns')}
            className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'patterns'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Weekly Patterns
          </button>
          <button
            onClick={() => onSelectTab('sessions')}
            className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'sessions'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Session History
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenChatbot}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-2xs"
            title="Ask AI Study Mentor"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Coach</span>
          </button>

          <button
            onClick={onOpenTimerModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap shrink-0"
            title="Focus Timer"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Focus Timer</span>
          </button>

          <button
            onClick={onOpenReportModal}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            <FileDown className="w-3.5 h-3.5 text-blue-600" />
            <span>Export PDF</span>
          </button>

          <button
            onClick={onOpenLogModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log Study</span>
          </button>

          {/* Student Profile Avatar trigger */}
          {onOpenAvatarModal && (
            <button
              type="button"
              onClick={onOpenAvatarModal}
              className="flex items-center gap-2 pl-1 pr-1.5 sm:pr-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200/90 transition-all shrink-0 cursor-pointer ml-1"
              title="Click to customize profile avatar and photo"
            >
              <Avatar
                name={studentName}
                avatarUrl={avatarUrl}
                avatarType={avatarType}
                avatarConfig={avatarConfig}
                avatarFrame={avatarFrame}
                avatarFilter={avatarFilter}
                accentColor={avatarAccentColor}
                size="sm"
              />
              <span className="hidden xl:inline text-xs font-semibold text-slate-800 max-w-[85px] truncate">
                {studentName}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile subnavigation bar */}
      <div className="md:hidden flex items-center justify-around px-2 py-1.5 border-t border-slate-100 bg-slate-50/50 text-xs">
        <button
          onClick={() => onSelectTab('dashboard')}
          className={`py-1 px-2.5 rounded ${
            activeTab === 'dashboard' ? 'font-bold text-blue-600' : 'text-slate-600'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => onSelectTab('subjects')}
          className={`py-1 px-2.5 rounded ${
            activeTab === 'subjects' ? 'font-bold text-blue-600' : 'text-slate-600'
          }`}
        >
          Subjects
        </button>
        <button
          onClick={() => onSelectTab('patterns')}
          className={`py-1 px-2.5 rounded ${
            activeTab === 'patterns' ? 'font-bold text-blue-600' : 'text-slate-600'
          }`}
        >
          Patterns
        </button>
        <button
          onClick={() => onSelectTab('sessions')}
          className={`py-1 px-2.5 rounded ${
            activeTab === 'sessions' ? 'font-bold text-blue-600' : 'text-slate-600'
          }`}
        >
          Sessions
        </button>
      </div>
    </header>
  );
};
