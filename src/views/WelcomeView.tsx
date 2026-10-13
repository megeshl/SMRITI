import React, { useState } from 'react';
import {
  Heart,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Globe,
  User,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { SupportedLanguage, UserRole } from '../types';
import { translations } from '../data/translations';
import { Logo } from '../components/Logo';

interface WelcomeViewProps {
  onStart: (role: UserRole, lang: SupportedLanguage) => void;
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({
  onStart,
  currentLang,
  onLanguageChange
}) => {
  const t = translations[currentLang];
  const [selectedRole, setSelectedRole] = useState<UserRole>('elderly');
  const [step, setStep] = useState<'intro' | 'role_select' | 'consent'>('intro');

  const languages: { code: SupportedLanguage; label: string; script: string }[] = [
    { code: 'en', label: 'English', script: 'English' },
    { code: 'ta', label: 'தமிழ்', script: 'Tamil' },
    { code: 'hi', label: 'हिंदी', script: 'Hindi' },
    { code: 'as', label: 'অসমীয়া', script: 'Assamese' }
  ];

  return (
    <div className="min-h-screen bg-[#FBF8EF] flex flex-col justify-between relative overflow-hidden">
      {/* Gentle Botanical Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5EFE7]/50 rounded-full blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#DDF5EB]/40 rounded-full blur-3xl -z-10 transform -translate-x-1/4 translate-y-1/4" />

      {/* Top Header */}
      <header className="px-6 py-5 max-w-7xl mx-auto w-full flex items-center justify-between">
        <Logo size="md" />

        {/* Language selector in top right */}
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-2xl border border-[#E6EAE5]">
          <Globe className="w-4 h-4 text-[#167D83]" />
          <div className="flex items-center gap-1">
            {languages.map(l => (
              <button
                key={l.code}
                type="button"
                onClick={() => onLanguageChange(l.code)}
                className={`px-2.5 py-1 rounded-xl text-xs font-medium transition-colors ${
                  currentLang === l.code
                    ? 'bg-[#167D83] text-white shadow-xs'
                    : 'text-[#17324D] hover:bg-[#E5EFE7]'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 py-6 flex-1 flex items-center justify-center">
        {step === 'intro' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Reassuring message & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#167D83] uppercase bg-[#E5EFE7] px-3.5 py-1.5 rounded-full">
                <Heart className="w-3.5 h-3.5 fill-[#167D83]" />
                <span>Personalized Cognitive Intelligence</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#17324D] leading-[1.15] text-balance">
                From personal memories to meaningful care.
              </h1>

              <p className="text-lg sm:text-xl text-[#617386] font-normal leading-relaxed max-w-xl">
                SMRITI transforms family photos, beloved places, and familiar routines into calming
                cognitive moments for elderly loved ones—while keeping caregivers connected with
                gentle activity insights.
              </p>

              {/* Call-to-action buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  type="button"
                  onClick={() => setStep('role_select')}
                  className="px-8 py-4 bg-[#167D83] hover:bg-[#075B60] text-white text-lg font-semibold rounded-2xl shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <span>{t.getStarted}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => onStart('elderly', currentLang)}
                  className="px-6 py-4 bg-white hover:bg-[#E5EFE7] text-[#167D83] text-base font-semibold rounded-2xl border border-[#167D83]/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-5 h-5 text-[#F4A261]" />
                  <span>{t.tryDemo}</span>
                </button>
              </div>

              {/* Trust & Non-medical disclaimer */}
              <div className="pt-4 flex items-start gap-2.5 text-xs text-[#617386] max-w-lg">
                <ShieldCheck className="w-4 h-4 text-[#167D83] shrink-0 mt-0.5" />
                <span>
                  {t.medicalDisclaimer}
                </span>
              </div>
            </div>

            {/* Right Column: Warm elderly photography */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] bg-[#E5EFE7]">
                <img
                  src="/src/assets/images/welcome_lakshmi_nature_1791906008255.jpg"
                  alt="Lakshmi Amma in serene garden veranda"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="font-serif text-xl font-medium">Lakshmi Amma, 72</p>
                    <p className="text-xs text-white/90">
                      Mylapore, Chennai · Engaging with 5 cherished family memories
                    </p>
                  </div>
                </div>
              </div>

              {/* Nature quote badge */}
              <div className="mt-4 bg-white/95 rounded-2xl p-4 border border-[#E6EAE5] shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E5EFE7] flex items-center justify-center text-[#167D83] shrink-0">
                  <Heart className="w-5 h-5 fill-[#167D83]/20" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#17324D]">
                    “SMRITI doesn't just personalize the game.”
                  </p>
                  <p className="text-xs text-[#617386]">
                    It personalizes the moment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Role Selection */}
        {step === 'role_select' && (
          <div className="max-w-2xl w-full bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-[#E6EAE5]">
            <div className="text-center space-y-2 mb-8">
              <span className="text-xs font-semibold tracking-wider text-[#167D83] uppercase">
                Step 2 of 2
              </span>
              <h2 className="font-serif text-3xl text-[#17324D]">
                {t.chooseRoleTitle}
              </h2>
              <p className="text-sm text-[#617386]">
                You can change this mode at any time from the sidebar.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {/* Elderly User Card */}
              <button
                type="button"
                onClick={() => setSelectedRole('elderly')}
                className={`p-6 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
                  selectedRole === 'elderly'
                    ? 'border-[#167D83] bg-[#E5EFE7]/40 shadow-xs'
                    : 'border-[#E6EAE5] hover:border-[#167D83]/40 bg-white'
                }`}
              >
                {selectedRole === 'elderly' && (
                  <CheckCircle2 className="w-5 h-5 text-[#167D83] absolute top-4 right-4" />
                )}
                <div className="w-12 h-12 rounded-2xl bg-[#DDF5EB] flex items-center justify-center text-[#167D83] mb-4">
                  <User className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-[#17324D] mb-1">
                  {t.roleElderly}
                </h3>
                <p className="text-sm text-[#617386] leading-relaxed">
                  {t.roleElderlyDesc}
                </p>
              </button>

              {/* Caregiver Card */}
              <button
                type="button"
                onClick={() => setSelectedRole('caregiver')}
                className={`p-6 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
                  selectedRole === 'caregiver'
                    ? 'border-[#167D83] bg-[#E5EFE7]/40 shadow-xs'
                    : 'border-[#E6EAE5] hover:border-[#167D83]/40 bg-white'
                }`}
              >
                {selectedRole === 'caregiver' && (
                  <CheckCircle2 className="w-5 h-5 text-[#167D83] absolute top-4 right-4" />
                )}
                <div className="w-12 h-12 rounded-2xl bg-[#E5EFE7] flex items-center justify-center text-[#167D83] mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-[#17324D] mb-1">
                  {t.roleCaregiver}
                </h3>
                <p className="text-sm text-[#617386] leading-relaxed">
                  {t.roleCaregiverDesc}
                </p>
              </button>
            </div>

            {selectedRole === 'caregiver' && (
              <div className="mb-6 p-4 rounded-2xl bg-[#FBF8EF] border border-[#E6EAE5] flex items-start gap-3">
                <Lock className="w-5 h-5 text-[#167D83] shrink-0 mt-0.5" />
                <div className="text-xs text-[#617386]">
                  <p className="font-semibold text-[#17324D] mb-0.5">Caregiver Consent & Privacy Protection</p>
                  <p>
                    All personal family memories and voice recordings remain stored locally or within
                    authorized family care networks. Activity patterns are kept private and never shared
                    with third-party advertisers.
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep('intro')}
                className="px-5 py-3 text-sm font-medium text-[#617386] hover:text-[#17324D] transition-colors"
              >
                Back
              </button>

              <button
                type="button"
                onClick={() => onStart(selectedRole, currentLang)}
                className="px-8 py-3.5 bg-[#167D83] hover:bg-[#075B60] text-white text-base font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Enter Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-[#E6EAE5] bg-white/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-[#617386] gap-2">
          <span>SMRITI — Personal Cognitive Intelligence for Elderly Care</span>
          <span>Invest-Ready Hackathon Prototype · Offline-Capable</span>
        </div>
      </footer>
    </div>
  );
};
