import React from 'react';
import { Home, Image as ImageIcon, Sparkles, TrendingUp, Activity } from 'lucide-react';
import { NavTab } from './Sidebar';
import { SupportedLanguage } from '../types';
import { translations } from '../data/translations';

interface BottomNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  currentLang: SupportedLanguage;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  currentLang
}) => {
  const t = translations[currentLang];

  const items = [
    { id: 'home' as NavTab, label: t.navHome, icon: <Home className="w-5 h-5" /> },
    { id: 'memories' as NavTab, label: t.navMemories, icon: <ImageIcon className="w-5 h-5" /> },
    { id: 'games' as NavTab, label: t.navGames, icon: <Sparkles className="w-5 h-5" /> },
    { id: 'progress' as NavTab, label: t.navProgress, icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'carepulse' as NavTab, label: t.navCarePulse, icon: <Activity className="w-5 h-5" /> }
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E6EAE5] py-2 px-3 z-40 flex items-center justify-around shadow-lg"
    >
      {items.map(item => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectTab(item.id)}
            className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-colors min-w-[56px] ${
              isActive ? 'text-[#167D83] font-semibold' : 'text-[#617386]'
            }`}
          >
            <div
              className={`p-1 rounded-xl ${
                isActive ? 'bg-[#E5EFE7] text-[#167D83]' : 'text-[#617386]'
              }`}
            >
              {item.icon}
            </div>
            <span className="text-[11px] mt-0.5 truncate max-w-[64px]">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
