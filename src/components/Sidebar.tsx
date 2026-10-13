import React from 'react';
import {
  Home,
  Image as ImageIcon,
  Sparkles,
  TrendingUp,
  Activity,
  Radio,
  Settings,
  UserCheck
} from 'lucide-react';
import { UserProfile, SupportedLanguage } from '../types';
import { translations } from '../data/translations';
import { Logo } from './Logo';

export type NavTab =
  | 'home'
  | 'memories'
  | 'games'
  | 'progress'
  | 'carepulse'
  | 'caretag'
  | 'settings';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  profile: UserProfile;
  currentLang: SupportedLanguage;
  onToggleRole: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  profile,
  currentLang,
  onToggleRole
}) => {
  const t = translations[currentLang];

  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: t.navHome, icon: <Home className="w-5 h-5" /> },
    { id: 'memories', label: t.navMemories, icon: <ImageIcon className="w-5 h-5" /> },
    { id: 'games', label: t.navGames, icon: <Sparkles className="w-5 h-5" /> },
    { id: 'progress', label: t.navProgress, icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'carepulse', label: t.navCarePulse, icon: <Activity className="w-5 h-5" /> },
    { id: 'caretag', label: t.navCareTag, icon: <Radio className="w-5 h-5" />, badge: 'Concept' },
    { id: 'settings', label: t.navSettings, icon: <Settings className="w-5 h-5" /> }
  ];

  return (
    <aside
      aria-label="Primary Navigation"
      className="w-64 xl:w-72 bg-white border-r border-[#E6EAE5] flex flex-col justify-between shrink-0 min-h-screen sticky top-0"
    >
      {/* Brand Header */}
      <div className="p-6 border-b border-[#E6EAE5]">
        <button
          type="button"
          onClick={() => onSelectTab('home')}
          className="text-left focus:outline-none"
        >
          <Logo size="md" showTagline={true} />
        </button>
      </div>

      {/* Nav List */}
      <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
        {navItems.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-left font-medium transition-all text-sm md:text-base ${
                isActive
                  ? 'bg-[#E5EFE7] text-[#167D83] font-semibold shadow-xs'
                  : 'text-[#17324D] hover:bg-[#FBF8EF] hover:text-[#167D83]'
              }`}
            >
              <div className="flex items-center gap-3.5 truncate">
                <span className={isActive ? 'text-[#167D83]' : 'text-[#617386]'}>
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[11px] font-normal text-[#617386] ml-2">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Profile & Role Switcher */}
      <div className="p-4 border-t border-[#E6EAE5] bg-[#FBF8EF]/60 m-3 rounded-2xl">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={profile.avatarUrl}
            alt={profile.displayName}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-[#167D83]/20"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-[#17324D] truncate">
              {profile.displayName}
            </h4>
            <p className="text-xs text-[#617386] truncate">
              {profile.role === 'elderly' ? 'Elderly User Mode' : 'Caregiver Mode'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleRole}
          className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-white border border-[#E6EAE5] text-[#167D83] hover:bg-[#E5EFE7] transition-colors flex items-center justify-center gap-1.5"
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Switch to {profile.role === 'elderly' ? 'Caregiver' : 'Elderly'} View</span>
        </button>
      </div>
    </aside>
  );
};
