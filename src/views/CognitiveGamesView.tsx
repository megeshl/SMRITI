import React, { useState } from 'react';
import {
  Heart,
  Layers,
  Calendar,
  Clock,
  Sparkles,
  Play,
  Volume2,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { Memory, SupportedLanguage, ActivityType, ActivitySession } from '../types';
import { translations } from '../data/translations';
import { GamePhotoRecall } from './GamePhotoRecall';
import { GameObjectMatch } from './GameObjectMatch';
import { GameStoryBuilder } from './GameStoryBuilder';
import { GameDailyRoutine } from './GameDailyRoutine';

interface CognitiveGamesViewProps {
  memories: Memory[];
  currentLang: SupportedLanguage;
  activeGame: ActivityType | null;
  onLaunchGame: (game: ActivityType) => void;
  onCloseGame: () => void;
  onSaveSession: (sessionData: Omit<ActivitySession, 'id'>) => void;
}

export const CognitiveGamesView: React.FC<CognitiveGamesViewProps> = ({
  memories,
  currentLang,
  activeGame,
  onLaunchGame,
  onCloseGame,
  onSaveSession
}) => {
  const t = translations[currentLang];
  const [filter, setFilter] = useState<'All' | 'Family' | 'Household' | 'Sequencing'>('All');

  // If a game is active, render the specific game component
  if (activeGame === 'photo_recall') {
    return (
      <GamePhotoRecall
        memories={memories}
        currentLang={currentLang}
        onFinishGame={onSaveSession}
        onExit={onCloseGame}
      />
    );
  }

  if (activeGame === 'object_match') {
    return (
      <GameObjectMatch
        currentLang={currentLang}
        onFinishGame={onSaveSession}
        onExit={onCloseGame}
      />
    );
  }

  if (activeGame === 'story_builder') {
    return (
      <GameStoryBuilder
        currentLang={currentLang}
        onFinishGame={onSaveSession}
        onExit={onCloseGame}
      />
    );
  }

  if (activeGame === 'daily_routine') {
    return (
      <GameDailyRoutine
        currentLang={currentLang}
        onFinishGame={onSaveSession}
        onExit={onCloseGame}
      />
    );
  }

  // Otherwise render the Game Selection Hub
  const gameCards: {
    id: ActivityType;
    title: string;
    description: string;
    category: 'Family' | 'Household' | 'Sequencing';
    timeEstimate: string;
    icon: React.ReactNode;
    colorBg: string;
    colorText: string;
    accentBadge: string;
    imageUrl?: string;
  }[] = [
    {
      id: 'photo_recall',
      title: t.photoRecallTitle,
      description: 'Recognize familiar family faces, grandchildren smiles, and auspicious occasions.',
      category: 'Family',
      timeEstimate: '3-4 mins · Gentle',
      icon: <Heart className="w-6 h-6 fill-current" />,
      colorBg: 'bg-[#E5EFE7]',
      colorText: 'text-[#167D83]',
      accentBadge: 'Most Cherished',
      imageUrl: '/src/assets/images/memory_family_festive_1791906009099.jpg'
    },
    {
      id: 'object_match',
      title: t.objectMatchTitle,
      description: 'Connect traditional items—like brass coffee tumblers & jasmine flowers—to their rituals.',
      category: 'Household',
      timeEstimate: '3 mins · Relaxed',
      icon: <Layers className="w-6 h-6" />,
      colorBg: 'bg-[#DDF5EB]',
      colorText: 'text-[#167D83]',
      accentBadge: 'Familiar Comfort',
      imageUrl: '/src/assets/images/memory_morning_tea_1791906009984.jpg'
    },
    {
      id: 'story_builder',
      title: t.storyBuilderTitle,
      description: 'Arrange personal festive events and family gatherings in peaceful sequence.',
      category: 'Sequencing',
      timeEstimate: '4 mins · Story-rich',
      icon: <Calendar className="w-6 h-6" />,
      colorBg: 'bg-[#FBF8EF]',
      colorText: 'text-[#F4A261]',
      accentBadge: 'Narrative Joy',
      imageUrl: '/src/assets/images/welcome_lakshmi_nature_1791906008255.jpg'
    },
    {
      id: 'daily_routine',
      title: t.dailyRoutineTitle,
      description: 'Sequence daily morning tea, sacred Tulsi watering, and peaceful prayers.',
      category: 'Sequencing',
      timeEstimate: '3 mins · Daily Flow',
      icon: <Clock className="w-6 h-6" />,
      colorBg: 'bg-[#E5EFE7]',
      colorText: 'text-[#167D83]',
      accentBadge: 'Daily Rhythm',
      imageUrl: '/src/assets/images/memory_tulsi_plant_1791906010657.jpg'
    }
  ];

  const filteredCards = gameCards.filter(
    c => filter === 'All' || c.category === filter
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#17324D]">
          Cognitive Activities Hub
        </h1>
        <p className="text-base text-[#617386] mt-1 max-w-2xl">
          Non-stressful, familiar engagement designed for dignity, joy, and meaningful moments.
          No clocks, no scoring penalties.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex items-center gap-2">
        {(['All', 'Family', 'Household', 'Sequencing'] as const).map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              filter === cat
                ? 'bg-[#167D83] text-white shadow-xs'
                : 'bg-white hover:bg-[#E5EFE7] text-[#617386] border border-[#E6EAE5]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCards.map(game => (
          <div
            key={game.id}
            className="bg-white rounded-3xl border border-[#E6EAE5] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Photo preview banner */}
              {game.imageUrl && (
                <div className="h-44 bg-[#FBF8EF] relative overflow-hidden">
                  <img
                    src={game.imageUrl}
                    alt={game.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-xl text-xs font-semibold text-[#17324D]">
                    {game.accentBadge}
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-xl text-xs text-white">
                    {game.timeEstimate}
                  </div>
                </div>
              )}

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl ${game.colorBg} ${game.colorText} flex items-center justify-center shrink-0`}
                  >
                    {game.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-[#17324D] font-bold">
                      {game.title}
                    </h3>
                    <span className="text-xs text-[#617386]">
                      {game.category} Activity
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[#617386] leading-relaxed">
                  {game.description}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                type="button"
                onClick={() => onLaunchGame(game.id)}
                className="w-full py-3.5 bg-[#167D83] hover:bg-[#075B60] text-white font-semibold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer group"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Begin Activity</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Gentle reassurance banner */}
      <div className="p-6 rounded-3xl bg-[#F4F9F6] border border-[#E6EAE5] flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white text-[#167D83] border border-[#E6EAE5] flex items-center justify-center shrink-0">
          <Sparkles className="w-6 h-6 text-[#F4A261]" />
        </div>
        <div>
          <h4 className="font-semibold text-sm text-[#17324D]">
            Adaptive, Pressure-Free Design
          </h4>
          <p className="text-xs text-[#617386] mt-0.5">
            SMRITI adapts question choices and provides gentle hints without any failure states.
            Elderly users are free to pause or repeat whenever they wish.
          </p>
        </div>
      </div>
    </div>
  );
};
