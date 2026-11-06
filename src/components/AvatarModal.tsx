import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Check,
  Download,
  Dices,
  Image as ImageIcon,
  Palette,
  Sparkles,
  Trash2,
  Upload,
  User,
  Wand2,
  X,
  Shield,
  Layers,
} from 'lucide-react';
import { Avatar } from './Avatar';
import { AvatarCustomConfig } from '../types';
import {
  PRESET_AVATARS,
  AVATAR_ACCENT_COLORS,
  AVATAR_SKIN_TONES,
  AVATAR_HAIR_STYLES,
  AVATAR_HAIR_COLORS,
  AVATAR_EXPRESSIONS,
  AVATAR_CLOTHING_STYLES,
  AVATAR_CLOTHING_COLORS,
  AVATAR_ACCESSORIES,
  AVATAR_BACKDROPS,
  AVATAR_FRAMES,
  AVATAR_PHOTO_FILTERS,
  DEFAULT_AVATAR_CONFIG,
  generateRandomAvatarConfig,
  resizeImageToDataUrl,
} from '../utils/avatars';

interface AvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  currentAvatarUrl?: string;
  currentAvatarType?: 'preset' | 'custom' | 'initials' | 'builder';
  currentAccentColor?: string;
  currentAvatarConfig?: AvatarCustomConfig;
  currentAvatarFrame?: 'none' | 'flame' | 'laurel' | 'crown' | 'neon' | 'scholar';
  currentAvatarFilter?: 'normal' | 'scholar' | 'warm' | 'noir' | 'cyber';
  currentStreak?: number;
  onSaveAvatar: (avatarData: {
    avatarUrl: string;
    avatarType: 'preset' | 'custom' | 'initials' | 'builder';
    avatarAccentColor: string;
    avatarConfig?: AvatarCustomConfig;
    avatarFrame?: 'none' | 'flame' | 'laurel' | 'crown' | 'neon' | 'scholar';
    avatarFilter?: 'normal' | 'scholar' | 'warm' | 'noir' | 'cyber';
  }) => void;
}

export const AvatarModal: React.FC<AvatarModalProps> = ({
  isOpen,
  onClose,
  studentName,
  currentAvatarUrl = '/student_avatar.jpg',
  currentAvatarType = 'preset',
  currentAccentColor = '#2563eb',
  currentAvatarConfig = DEFAULT_AVATAR_CONFIG,
  currentAvatarFrame = 'none',
  currentAvatarFilter = 'normal',
  currentStreak = 0,
  onSaveAvatar,
}) => {
  // All hooks called unconditionally before early return
  const [activeTab, setActiveTab] = useState<'builder' | 'presets' | 'upload' | 'initials'>('builder');
  const [selectedUrl, setSelectedUrl] = useState(currentAvatarUrl);
  const [selectedType, setSelectedType] = useState<'preset' | 'custom' | 'initials' | 'builder'>(currentAvatarType);
  const [selectedAccent, setSelectedAccent] = useState(currentAccentColor);
  const [selectedConfig, setSelectedConfig] = useState<AvatarCustomConfig>(currentAvatarConfig || DEFAULT_AVATAR_CONFIG);
  const [selectedFrame, setSelectedFrame] = useState<'none' | 'flame' | 'laurel' | 'crown' | 'neon' | 'scholar'>(
    currentAvatarFrame || 'none'
  );
  const [selectedFilter, setSelectedFilter] = useState<'normal' | 'scholar' | 'warm' | 'noir' | 'cyber'>(
    currentAvatarFilter || 'normal'
  );

  const [builderCategory, setBuilderCategory] = useState<'skin' | 'hair' | 'face' | 'clothing' | 'gear' | 'backdrop'>(
    'hair'
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state whenever modal is opened
  useEffect(() => {
    if (isOpen) {
      setSelectedUrl(currentAvatarUrl || '/student_avatar.jpg');
      setSelectedType(currentAvatarType || 'builder');
      setSelectedAccent(currentAccentColor || '#2563eb');
      setSelectedConfig(currentAvatarConfig || DEFAULT_AVATAR_CONFIG);
      setSelectedFrame(currentAvatarFrame || 'none');
      setSelectedFilter(currentAvatarFilter || 'normal');
      setUploadError(null);

      if (currentAvatarType === 'custom') {
        setActiveTab('upload');
      } else if (currentAvatarType === 'initials') {
        setActiveTab('initials');
      } else if (currentAvatarType === 'preset') {
        setActiveTab('presets');
      } else {
        setActiveTab('builder');
      }
    }
  }, [
    isOpen,
    currentAvatarUrl,
    currentAvatarType,
    currentAccentColor,
    currentAvatarConfig,
    currentAvatarFrame,
    currentAvatarFilter,
  ]);

  if (!isOpen) return null;

  const handleRandomize = () => {
    const randomConfig = generateRandomAvatarConfig();
    setSelectedConfig(randomConfig);
    setSelectedType('builder');
    setActiveTab('builder');
  };

  const handleSelectPreset = (presetId: string, imageSrc?: string, presetConfig?: AvatarCustomConfig) => {
    if (presetConfig) {
      setSelectedConfig(presetConfig);
      setSelectedType('builder');
      setActiveTab('builder');
    } else {
      setSelectedUrl(imageSrc || presetId);
      setSelectedType('preset');
    }
    setUploadError(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    try {
      setIsProcessing(true);
      setUploadError(null);
      const dataUrl = await resizeImageToDataUrl(file, 360);
      setSelectedUrl(dataUrl);
      setSelectedType('custom');
      setActiveTab('upload');
    } catch (err: any) {
      setUploadError(err.message || 'Failed to process image');
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSave = () => {
    onSaveAvatar({
      avatarUrl: selectedUrl,
      avatarType: selectedType,
      avatarAccentColor: selectedAccent,
      avatarConfig: selectedConfig,
      avatarFrame: selectedFrame,
      avatarFilter: selectedFilter,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 leading-tight">
                StudyFlow Avatar Studio
              </h2>
              <p className="text-xs text-slate-500">
                Design your custom student character, upload a photo, or choose a study persona
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Top Live Preview Banner */}
          <div className="p-4 bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-slate-50 rounded-2xl border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar
                  name={studentName}
                  avatarUrl={selectedUrl}
                  avatarType={selectedType}
                  avatarConfig={selectedConfig}
                  avatarFrame={selectedFrame}
                  avatarFilter={selectedFilter}
                  accentColor={selectedAccent}
                  size="2xl"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">{studentName}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase tracking-wider">
                    {selectedType}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedType === 'builder'
                    ? 'Modular Vector Character'
                    : selectedType === 'preset'
                    ? 'Pre-designed Study Archetype'
                    : selectedType === 'custom'
                    ? 'Personal Uploaded Photo'
                    : 'Minimalist Initials Monogram'}
                </p>
                {selectedFrame !== 'none' && (
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-700 mt-1">
                    <span>Frame:</span>
                    <span className="capitalize">{selectedFrame}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex sm:flex-col gap-2 shrink-0">
              <button
                type="button"
                onClick={handleRandomize}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-white hover:bg-indigo-50 border border-indigo-200 rounded-lg shadow-2xs transition-colors"
                title="Randomize character parts"
              >
                <Dices className="w-3.5 h-3.5 text-indigo-600" />
                <span>Randomize</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedType('builder');
                  setActiveTab('builder');
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg shadow-2xs transition-colors ${
                  activeTab === 'builder'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Fine Tune</span>
              </button>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex border-b border-slate-200 gap-4 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setActiveTab('builder');
                setSelectedType('builder');
              }}
              className={`pb-2.5 transition-colors border-b-2 flex items-center gap-1.5 ${
                activeTab === 'builder'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Character Studio</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('presets')}
              className={`pb-2.5 transition-colors border-b-2 flex items-center gap-1.5 ${
                activeTab === 'presets'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Archetype Presets</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('upload');
                setSelectedType('custom');
              }}
              className={`pb-2.5 transition-colors border-b-2 flex items-center gap-1.5 ${
                activeTab === 'upload'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Photo & Filters</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('initials');
                setSelectedType('initials');
              }}
              className={`pb-2.5 transition-colors border-b-2 flex items-center gap-1.5 ${
                activeTab === 'initials'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Initials Monogram</span>
            </button>
          </div>

          {/* TAB 1: CHARACTER STUDIO BUILDER */}
          {activeTab === 'builder' && (
            <div className="space-y-4">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl">
                {[
                  { id: 'hair', label: 'Hairstyle & Color' },
                  { id: 'skin', label: 'Skin Tone' },
                  { id: 'face', label: 'Expression' },
                  { id: 'clothing', label: 'Outfit & Style' },
                  { id: 'gear', label: 'Accessories' },
                  { id: 'backdrop', label: 'Study Backdrop' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setBuilderCategory(cat.id as any)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      builderCategory === cat.id
                        ? 'bg-white text-blue-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Category Content: Hair & Color */}
              {builderCategory === 'hair' && (
                <div className="space-y-3 bg-slate-50/70 p-4 rounded-xl border border-slate-200">
                  <div>
                    <span className="block text-xs font-bold text-slate-700 mb-2">
                      Hairstyle
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                      {AVATAR_HAIR_STYLES.map((h) => (
                        <button
                          key={h.id}
                          type="button"
                          onClick={() =>
                            setSelectedConfig((prev) => ({ ...prev, hairStyle: h.id }))
                          }
                          className={`p-2 text-xs font-semibold rounded-lg border text-center transition-all ${
                            selectedConfig.hairStyle === h.id
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {h.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200">
                    <span className="block text-xs font-bold text-slate-700 mb-2">
                      Hair Color
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {AVATAR_HAIR_COLORS.map((col) => (
                        <button
                          key={col.value}
                          type="button"
                          onClick={() =>
                            setSelectedConfig((prev) => ({ ...prev, hairColor: col.value }))
                          }
                          className={`w-7 h-7 rounded-full border border-slate-300 transition-transform flex items-center justify-center ${
                            selectedConfig.hairColor === col.value
                              ? 'scale-115 ring-2 ring-offset-2 ring-blue-500 shadow-xs'
                              : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: col.value }}
                          title={col.name}
                        >
                          {selectedConfig.hairColor === col.value && (
                            <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Category Content: Skin Tone */}
              {builderCategory === 'skin' && (
                <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200">
                  <span className="block text-xs font-bold text-slate-700 mb-3">
                    Choose Skin Tone
                  </span>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                    {AVATAR_SKIN_TONES.map((tone) => (
                      <button
                        key={tone.value}
                        type="button"
                        onClick={() =>
                          setSelectedConfig((prev) => ({ ...prev, skinTone: tone.value }))
                        }
                        className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all ${
                          selectedConfig.skinTone === tone.value
                            ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-400'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div
                          className="w-8 h-8 rounded-full border border-slate-300 shadow-2xs"
                          style={{ backgroundColor: tone.value }}
                        />
                        <span className="text-[10px] font-semibold text-slate-700 text-center leading-tight">
                          {tone.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Category Content: Expression */}
              {builderCategory === 'face' && (
                <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200">
                  <span className="block text-xs font-bold text-slate-700 mb-3">
                    Facial Mood & Study Expression
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {AVATAR_EXPRESSIONS.map((exp) => (
                      <button
                        key={exp.id}
                        type="button"
                        onClick={() =>
                          setSelectedConfig((prev) => ({ ...prev, expression: exp.id }))
                        }
                        className={`p-3 rounded-xl border text-left transition-all ${
                          selectedConfig.expression === exp.id
                            ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-400'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-900">{exp.name}</div>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          {exp.id === 'focused'
                            ? 'Sharp gaze for deep reading'
                            : exp.id === 'happy'
                            ? 'Optimistic high-energy achiever'
                            : exp.id === 'determined'
                            ? 'Laser-focused on target deadlines'
                            : exp.id === 'zen'
                            ? 'Relaxed flow state'
                            : 'Scholar with glasses alignment'}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Category Content: Outfit & Style */}
              {builderCategory === 'clothing' && (
                <div className="space-y-3 bg-slate-50/70 p-4 rounded-xl border border-slate-200">
                  <div>
                    <span className="block text-xs font-bold text-slate-700 mb-2">
                      Outfit Type
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {AVATAR_CLOTHING_STYLES.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() =>
                            setSelectedConfig((prev) => ({ ...prev, clothing: c.id }))
                          }
                          className={`p-2.5 text-xs font-semibold rounded-lg border text-center transition-all ${
                            selectedConfig.clothing === c.id
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200">
                    <span className="block text-xs font-bold text-slate-700 mb-2">
                      Outfit Color
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {AVATAR_CLOTHING_COLORS.map((col) => (
                        <button
                          key={col.value}
                          type="button"
                          onClick={() =>
                            setSelectedConfig((prev) => ({ ...prev, clothingColor: col.value }))
                          }
                          className={`w-7 h-7 rounded-full border border-slate-300 transition-transform flex items-center justify-center ${
                            selectedConfig.clothingColor === col.value
                              ? 'scale-115 ring-2 ring-offset-2 ring-blue-500 shadow-xs'
                              : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: col.value }}
                          title={col.name}
                        >
                          {selectedConfig.clothingColor === col.value && (
                            <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Category Content: Gear & Accessories */}
              {builderCategory === 'gear' && (
                <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200">
                  <span className="block text-xs font-bold text-slate-700 mb-3">
                    Study Gear & Wearables
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {AVATAR_ACCESSORIES.map((acc) => (
                      <button
                        key={acc.id}
                        type="button"
                        onClick={() =>
                          setSelectedConfig((prev) => ({ ...prev, accessory: acc.id }))
                        }
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          selectedConfig.accessory === acc.id
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs font-bold'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 font-semibold'
                        }`}
                      >
                        <div className="text-xs">{acc.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Category Content: Study Backdrop */}
              {builderCategory === 'backdrop' && (
                <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200">
                  <span className="block text-xs font-bold text-slate-700 mb-3">
                    Study Environment Backdrop
                  </span>
                  <div className="grid grid-cols-3 gap-2.5">
                    {AVATAR_BACKDROPS.map((bg) => (
                      <button
                        key={bg.id}
                        type="button"
                        onClick={() =>
                          setSelectedConfig((prev) => ({
                            ...prev,
                            backdrop: bg.id,
                            backdropColor: bg.color,
                          }))
                        }
                        className={`p-3 rounded-xl border text-left transition-all ${
                          selectedConfig.backdrop === bg.id
                            ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-400'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white shadow-2xs"
                            style={{ backgroundColor: bg.color }}
                          />
                          <span className="text-xs font-bold text-slate-800">{bg.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ARCHETYPE PRESETS */}
          {activeTab === 'presets' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                Choose an academic archetype to load directly or customize further:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-64 overflow-y-auto pr-1">
                {PRESET_AVATARS.map((p) => {
                  const isSelected =
                    selectedType === 'preset' && (selectedUrl === p.imageSrc || selectedUrl === p.id);

                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelectPreset(p.id, p.imageSrc, p.config)}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/30 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <Avatar
                        name={studentName}
                        avatarUrl={p.imageSrc || p.id}
                        avatarType={p.config ? 'builder' : 'preset'}
                        avatarConfig={p.config}
                        size="lg"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-800 block line-clamp-1">
                          {p.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold uppercase">
                          {p.category}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: PHOTO UPLOADER & FILTERS */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-blue-50/30 flex flex-col items-center justify-center gap-2 group"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800">
                    Click to choose a photo from your computer
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Supports JPG, PNG, or WebP. Auto-centered, square-cropped & compressed.
                  </p>
                </div>
              </div>

              {isProcessing && (
                <p className="text-xs text-blue-600 font-semibold text-center animate-pulse">
                  Optimizing and preparing image...
                </p>
              )}

              {uploadError && (
                <p className="text-xs text-rose-600 font-semibold text-center">{uploadError}</p>
              )}

              {/* Photo Filters */}
              <div className="pt-2 border-t border-slate-200">
                <span className="block text-xs font-bold text-slate-700 mb-2">
                  Artistic Study Photo Filters
                </span>
                <div className="grid grid-cols-5 gap-2">
                  {AVATAR_PHOTO_FILTERS.map((filt) => (
                    <button
                      key={filt.id}
                      type="button"
                      onClick={() => setSelectedFilter(filt.id)}
                      className={`p-2 text-xs font-semibold rounded-lg border text-center transition-all ${
                        selectedFilter === filt.id
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {filt.name}
                    </button>
                  ))}
                </div>
              </div>

              {selectedType === 'custom' && (
                <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Personal photo ready to apply to your student card</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedUrl('/student_avatar.jpg');
                      setSelectedType('preset');
                    }}
                    className="text-slate-500 hover:text-rose-600 p-1 transition-colors"
                    title="Remove uploaded photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: INITIALS MONOGRAM */}
          {activeTab === 'initials' && (
            <div className="space-y-4 text-center">
              <p className="text-xs text-slate-600">
                Prefer a minimalist, typography-driven monogram badge based on your initials:
              </p>
              <div className="flex justify-center">
                <div
                  onClick={() => setSelectedType('initials')}
                  className={`cursor-pointer p-5 rounded-2xl border flex flex-col items-center gap-3 transition-all ${
                    selectedType === 'initials'
                      ? 'border-blue-600 bg-blue-50/70 shadow-xs ring-2 ring-blue-500/30'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Avatar
                    name={studentName}
                    avatarType="initials"
                    avatarFrame={selectedFrame}
                    accentColor={selectedAccent}
                    size="2xl"
                  />
                  <div>
                    <span className="text-sm font-bold text-slate-900 block">
                      {studentName}
                    </span>
                    <span className="text-xs text-slate-500">Minimal Typography Monogram</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ACHIEVEMENT & COSMETIC AVATAR FRAMES */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-amber-500" />
                <span>Cosmetic & Achievement Avatar Frames</span>
              </span>
              <span className="text-[11px] text-slate-400">
                Unlocked by consistency & study streaks
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {AVATAR_FRAMES.map((frame) => {
                const isSelected = selectedFrame === frame.id;
                return (
                  <button
                    key={frame.id}
                    type="button"
                    onClick={() => setSelectedFrame(frame.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/70 ring-1 ring-amber-400 shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
                      <span>{frame.icon}</span>
                      <span>{frame.name}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                      {frame.unlockRequirement}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* HALO ACCENT PALETTE */}
          <div className="pt-3 border-t border-slate-200">
            <span className="block text-xs font-bold text-slate-700 mb-2">
              Halo Ring Accent Color
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {AVATAR_ACCENT_COLORS.map((col) => (
                <button
                  key={col.value}
                  type="button"
                  onClick={() => setSelectedAccent(col.value)}
                  className={`w-7 h-7 rounded-full border border-slate-300 transition-transform flex items-center justify-center ${
                    selectedAccent === col.value
                      ? 'scale-115 ring-2 ring-offset-2 ring-slate-500 shadow-xs'
                      : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: col.value }}
                  title={col.name}
                >
                  {selectedAccent === col.value && (
                    <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              setSelectedUrl('/student_avatar.jpg');
              setSelectedType('preset');
              setSelectedConfig(DEFAULT_AVATAR_CONFIG);
              setSelectedFrame('none');
              setSelectedFilter('normal');
              setSelectedAccent('#2563eb');
            }}
            className="text-xs text-slate-500 hover:text-slate-800 underline font-medium"
          >
            Reset to default
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
            >
              Apply Avatar Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
