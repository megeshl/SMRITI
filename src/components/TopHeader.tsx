import React from 'react';
import { PlusCircle, Sparkles, RefreshCw } from 'lucide-react';
import { UserProfile, SupportedLanguage } from '../types';
import { translations } from '../data/translations';
import { NavTab } from './Sidebar';

interface TopHeaderProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  profile: UserProfile;
  currentLang: SupportedLanguage;
  onOpenAddMemory: () => void;
  onStartTodayFocus: () => void;
  onResetDemo: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  activeTab,
  onSelectTab,
  profile,
  currentLang,
  onOpenAddMemory,
  onStartTodayFocus,
  onResetDemo
}) => {
  const t = translations[currentLang];

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case 'home':
        return `SMRITI / ${profile.displayName}`;
      case 'memories':
        return 'SMRITI / Memory Universe';
      case 'games':
        return 'SMRITI / Cognitive Games';
      case 'progress':
        return 'SMRITI / My Progress';
      case 'carepulse':
        return 'SMRITI / Care Pulse';
      case 'caretag':
        return 'SMRITI / Care Tag';
      case 'settings':
        return 'SMRITI / Settings & Accessibility';
      default:
        return 'SMRITI';
    }
  };

  return (
    <header className="h-16 bg-white border-b border-[#E6EAE5] px-6 flex items-center justify-between gap-8 sticky top-0 z-30">
      {/* Zone 1: Brand / Contextual Path */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-sm font-semibold tracking-tight text-[#17324D] whitespace-nowrap">
          {getBreadcrumbTitle()}
        </span>
      </div>

      {/* Zone 2: Single-line fast navigation links */}
      <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#617386] shrink-0">
        <button
          type="button"
          onClick={() => onSelectTab('home')}
          className={`hover:text-[#167D83] transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'home' ? 'text-[#167D83] font-semibold' : ''
          }`}
        >
          {t.navHome}
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('memories')}
          className={`hover:text-[#167D83] transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'memories' ? 'text-[#167D83] font-semibold' : ''
          }`}
        >
          {t.navMemories}
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('games')}
          className={`hover:text-[#167D83] transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'games' ? 'text-[#167D83] font-semibold' : ''
          }`}
        >
          {t.navGames}
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('carepulse')}
          className={`hover:text-[#167D83] transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'carepulse' ? 'text-[#167D83] font-semibold' : ''
          }`}
        >
          {t.navCarePulse}
        </button>
      </nav>

      {/* Zone 3: Primary Action & Demo reset */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Reset Demo button for evaluator convenience */}
        <button
          type="button"
          onClick={onResetDemo}
          title="Reset sample profile to Lakshmi Amma baseline"
          className="p-2 text-[#617386] hover:text-[#167D83] hover:bg-[#FBF8EF] rounded-xl transition-colors border border-transparent hover:border-[#E6EAE5]"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {activeTab === 'memories' ? (
          <button
            type="button"
            onClick={onOpenAddMemory}
            className="flex items-center gap-2 px-4 py-2 bg-[#167D83] hover:bg-[#075B60] text-white rounded-xl text-sm font-medium shadow-xs transition-colors whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.addMemory}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onStartTodayFocus}
            className="flex items-center gap-2 px-4 py-2 bg-[#167D83] hover:bg-[#075B60] text-white rounded-xl text-sm font-medium shadow-xs transition-colors whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.startActivity}</span>
          </button>
        )}
      </div>
    </header>
  );
};
