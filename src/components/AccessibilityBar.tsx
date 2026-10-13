import React from 'react';
import { Volume2, VolumeX, Eye, Sparkles, Wifi, WifiOff, Globe } from 'lucide-react';
import { SupportedLanguage, UserProfile } from '../types';
import { translations } from '../data/translations';

interface AccessibilityBarProps {
  profile: UserProfile;
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onUpdatePreferences: (prefs: Partial<UserProfile['accessibilityPreferences']>) => void;
  isSimulatedOffline: boolean;
  onToggleOffline: () => void;
}

export const AccessibilityBar: React.FC<AccessibilityBarProps> = ({
  profile,
  currentLang,
  onLanguageChange,
  onUpdatePreferences,
  isSimulatedOffline,
  onToggleOffline
}) => {
  const t = translations[currentLang];
  const { spokenAudio, highContrast, simpleMode, fontSize } = profile.accessibilityPreferences;

  return (
    <div
      role="region"
      aria-label="Accessibility & Quick Controls"
      className="bg-[#F4F9F6] border-b border-[#E6EAE5] px-4 py-2 text-xs text-[#617386]"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Language Selection */}
        <div className="flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 text-[#167D83]" aria-hidden="true" />
          <span className="font-medium text-[#17324D]">{t.selectLanguage}:</span>
          <div className="flex items-center gap-1">
            {(
              [
                { code: 'en', label: 'English' },
                { code: 'ta', label: 'தமிழ்' },
                { code: 'hi', label: 'हिंदी' },
                { code: 'as', label: 'অসমীয়া' }
              ] as const
            ).map(lang => (
              <button
                key={lang.code}
                type="button"
                onClick={() => onLanguageChange(lang.code)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  currentLang === lang.code
                    ? 'bg-[#167D83] text-white shadow-xs'
                    : 'bg-white hover:bg-[#E5EFE7] text-[#17324D] border border-[#E6EAE5]'
                }`}
                aria-pressed={currentLang === lang.code}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Accessibility Toggles & Offline status */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Spoken Instructions */}
          <button
            type="button"
            onClick={() => onUpdatePreferences({ spokenAudio: !spokenAudio })}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors border ${
              spokenAudio
                ? 'bg-[#E5EFE7] text-[#167D83] border-[#167D83]/30'
                : 'bg-white text-[#617386] border-[#E6EAE5] hover:text-[#17324D]'
            }`}
            title="Read instructions aloud"
            aria-pressed={spokenAudio}
          >
            {spokenAudio ? <Volume2 className="w-3.5 h-3.5 text-[#167D83]" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>Voice Voiceover {spokenAudio ? 'On' : 'Off'}</span>
          </button>

          {/* Simple Mode */}
          <button
            type="button"
            onClick={() => onUpdatePreferences({ simpleMode: !simpleMode })}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors border ${
              simpleMode
                ? 'bg-[#E5EFE7] text-[#167D83] border-[#167D83]/30'
                : 'bg-white text-[#617386] border-[#E6EAE5] hover:text-[#17324D]'
            }`}
            title="Simple Mode with larger focus cards"
            aria-pressed={simpleMode}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simple View {simpleMode ? 'Active' : ''}</span>
          </button>

          {/* High Contrast */}
          <button
            type="button"
            onClick={() => onUpdatePreferences({ highContrast: !highContrast })}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors border ${
              highContrast
                ? 'bg-[#17324D] text-white border-[#17324D]'
                : 'bg-white text-[#617386] border-[#E6EAE5] hover:text-[#17324D]'
            }`}
            title="Toggle high contrast for elderly reading"
            aria-pressed={highContrast}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>High Contrast</span>
          </button>

          {/* Text Size */}
          <div className="flex items-center gap-1 bg-white border border-[#E6EAE5] rounded-md px-1.5 py-0.5">
            <span className="text-[10px] uppercase font-bold text-[#617386] mr-1">Text:</span>
            {(['normal', 'large', 'xlarge'] as const).map(size => (
              <button
                key={size}
                type="button"
                onClick={() => onUpdatePreferences({ fontSize: size })}
                className={`px-1.5 py-0.5 rounded text-xs font-semibold ${
                  fontSize === size ? 'bg-[#167D83] text-white' : 'text-[#617386] hover:text-[#17324D]'
                }`}
                title={`Text size: ${size}`}
              >
                {size === 'normal' ? 'A' : size === 'large' ? 'A+' : 'A++'}
              </button>
            ))}
          </div>

          {/* Offline indicator / toggle */}
          <button
            type="button"
            onClick={onToggleOffline}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors border ${
              isSimulatedOffline
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-emerald-50 text-emerald-800 border-emerald-300'
            }`}
            title="Toggle simulated offline mode to test offline capabilities"
          >
            {isSimulatedOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
            <span>{isSimulatedOffline ? t.offlineStatus : t.onlineStatus}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
