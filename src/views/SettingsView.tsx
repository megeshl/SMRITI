import React, { useState } from 'react';
import {
  Settings,
  User,
  Shield,
  Volume2,
  Eye,
  Sparkles,
  RefreshCw,
  Check,
  Save,
  Globe,
  Trash2
} from 'lucide-react';
import { UserProfile, SupportedLanguage } from '../types';
import { translations } from '../data/translations';

interface SettingsViewProps {
  profile: UserProfile;
  currentLang: SupportedLanguage;
  onUpdateProfile: (updated: UserProfile) => void;
  onResetDemo: () => void;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  profile,
  currentLang,
  onUpdateProfile,
  onResetDemo,
  onLanguageChange
}) => {
  const t = translations[currentLang];
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [age, setAge] = useState(profile.age);
  const [caregiverName, setCaregiverName] = useState(profile.caregiverName || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const { fontSize, highContrast, spokenAudio, simpleMode, reduceMotion } =
    profile.accessibilityPreferences;
  const { shareWithCaregiver, shareAnonymousPatterns } = profile.consentSettings;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      displayName: displayName.trim(),
      age: Number(age) || 72,
      caregiverName: caregiverName.trim()
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleTogglePref = (
    key: keyof UserProfile['accessibilityPreferences'],
    val: any
  ) => {
    onUpdateProfile({
      ...profile,
      accessibilityPreferences: {
        ...profile.accessibilityPreferences,
        [key]: val
      }
    });
  };

  const handleToggleConsent = (
    key: keyof UserProfile['consentSettings'],
    val: boolean
  ) => {
    onUpdateProfile({
      ...profile,
      consentSettings: {
        ...profile.consentSettings,
        [key]: val
      }
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#17324D]">
          Settings & Accessibility
        </h1>
        <p className="text-base text-[#617386] mt-1">
          Customize elderly accessibility preferences, caregiver consent, and language options.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-[#DDF5EB] text-[#167D83] text-xs font-semibold rounded-2xl border border-[#22C55E]/30 flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Settings successfully updated and preserved locally.</span>
        </div>
      )}

      {/* 1. Profile Information */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6EAE5] shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E5EFE7] text-[#167D83] flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-[#17324D]">
              Personal Profile
            </h2>
            <p className="text-xs text-[#617386]">
              Personal identity details powering greetings and activities.
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#17324D] mb-1">
                Display Name (with honorific)
              </label>
              <input
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6EAE5] text-sm focus:border-[#167D83] outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17324D] mb-1">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={e => setAge(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6EAE5] text-sm focus:border-[#167D83] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#17324D] mb-1">
              Authorized Primary Caregiver
            </label>
            <input
              type="text"
              value={caregiverName}
              onChange={e => setCaregiverName(e.target.value)}
              placeholder="e.g. Priya Ramanathan (Daughter)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6EAE5] text-sm focus:border-[#167D83] outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#167D83] hover:bg-[#075B60] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      </div>

      {/* 2. Accessibility Preferences */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6EAE5] shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#DDF5EB] text-[#167D83] flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-[#17324D]">
              Accessibility & Comfort
            </h2>
            <p className="text-xs text-[#617386]">
              Designed specifically for senior users and low eye strain.
            </p>
          </div>
        </div>

        <div className="space-y-4 divide-y divide-[#E6EAE5]">
          {/* Spoken Instructions */}
          <div className="pt-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#17324D]">
                Spoken Audio Instructions (Voiceover)
              </p>
              <p className="text-xs text-[#617386]">
                Read questions, greetings, and feedback aloud automatically.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleTogglePref('spokenAudio', !spokenAudio)}
              className={`w-12 h-7 rounded-full p-1 transition-colors ${
                spokenAudio ? 'bg-[#167D83]' : 'bg-[#E6EAE5]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  spokenAudio ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* High Contrast */}
          <div className="pt-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#17324D]">High Contrast Text</p>
              <p className="text-xs text-[#617386]">
                Darker inks and sharper borders for improved readability.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleTogglePref('highContrast', !highContrast)}
              className={`w-12 h-7 rounded-full p-1 transition-colors ${
                highContrast ? 'bg-[#167D83]' : 'bg-[#E6EAE5]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  highContrast ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Simple Mode */}
          <div className="pt-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#17324D]">Simple View</p>
              <p className="text-xs text-[#617386]">
                Enlarges interactive buttons and reduces visual density.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleTogglePref('simpleMode', !simpleMode)}
              className={`w-12 h-7 rounded-full p-1 transition-colors ${
                simpleMode ? 'bg-[#167D83]' : 'bg-[#E6EAE5]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  simpleMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Text Size Scale */}
          <div className="pt-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#17324D]">Base Font Size</p>
              <p className="text-xs text-[#617386]">
                Adjust standard typography scale across all screens.
              </p>
            </div>
            <div className="flex gap-2">
              {(['normal', 'large', 'xlarge'] as const).map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleTogglePref('fontSize', size)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize ${
                    fontSize === size
                      ? 'bg-[#167D83] text-white shadow-xs'
                      : 'bg-[#FBF8EF] text-[#617386] border border-[#E6EAE5]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Consent & Privacy */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6EAE5] shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FBF8EF] text-[#F4A261] border border-[#E6EAE5] flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-[#17324D]">
              Consent & Data Sovereignty
            </h2>
            <p className="text-xs text-[#617386]">
              Full caregiver control over memory sharing and local caching.
            </p>
          </div>
        </div>

        <div className="space-y-4 divide-y divide-[#E6EAE5]">
          <div className="pt-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#17324D]">
                Share Memory Activity with Caregiver (Priya)
              </p>
              <p className="text-xs text-[#617386]">
                Allows Care Pulse dashboard to summarize favorite memories and activities.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleToggleConsent('shareWithCaregiver', !shareWithCaregiver)}
              className={`w-12 h-7 rounded-full p-1 transition-colors ${
                shareWithCaregiver ? 'bg-[#167D83]' : 'bg-[#E6EAE5]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  shareWithCaregiver ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Demo Data Actions */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6EAE5] shadow-xs space-y-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-[#17324D]">
            Demo Environment Management
          </h2>
          <p className="text-xs text-[#617386]">
            Reset the prototype to the fresh Lakshmi Amma baseline for evaluation.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onResetDemo}
            className="px-5 py-2.5 bg-[#E5EFE7] hover:bg-[#DDF5EB] text-[#167D83] text-xs font-semibold rounded-xl border border-[#167D83]/20 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Demo Data (Lakshmi Amma Baseline)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
