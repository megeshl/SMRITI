import React from 'react';
import {
  Volume2,
  Sparkles,
  Play,
  Heart,
  Clock,
  CheckCircle,
  HelpCircle,
  Calendar,
  Layers,
  ListOrdered
} from 'lucide-react';
import { UserProfile, Memory, SupportedLanguage, ActivityType } from '../types';
import { translations } from '../data/translations';
import { speechService } from '../services/speech';

interface ElderlyDashboardViewProps {
  profile: UserProfile;
  memories: Memory[];
  currentLang: SupportedLanguage;
  onLaunchGame: (gameType: ActivityType) => void;
  onNavigateToMemories: () => void;
  onNavigateToProgress: () => void;
}

export const ElderlyDashboardView: React.FC<ElderlyDashboardViewProps> = ({
  profile,
  memories,
  currentLang,
  onLaunchGame,
  onNavigateToMemories,
  onNavigateToProgress
}) => {
  const t = translations[currentLang];

  // Dynamic time-of-day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t.greetingMorning;
    if (hour < 17) return t.greetingAfternoon;
    return t.greetingEvening;
  };

  const handleSpeakGreeting = () => {
    const speechText = `${getGreeting()}, ${profile.displayName}! ${t.greetingSubtitle}`;
    speechService.speak(speechText, currentLang);
  };

  // Find featured memory for Today's Focus
  const templeMemory = memories.find(m => m.category === 'Places') || memories[0];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* 1. Personalized Time-of-Day Greeting */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6EAE5] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-3xl sm:text-4xl text-[#17324D] leading-tight">
              {getGreeting()}, {profile.displayName}!
            </h1>
            <button
              type="button"
              onClick={handleSpeakGreeting}
              title="Listen to greeting"
              className="p-2.5 rounded-full bg-[#E5EFE7] hover:bg-[#DDF5EB] text-[#167D83] transition-colors focus:ring-2 focus:ring-[#167D83]"
              aria-label="Read greeting aloud"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
          <p className="text-base sm:text-lg text-[#617386]">
            {t.greetingSubtitle}
          </p>
        </div>

        {/* Quick Profile Summary Badge */}
        <div className="flex items-center gap-4 bg-[#FBF8EF] px-4 py-3 rounded-2xl border border-[#E6EAE5] shrink-0">
          <img
            src={profile.avatarUrl}
            alt={profile.displayName}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-[#167D83]/20"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#17324D]">{profile.displayName}</span>
              <span className="text-xs text-[#617386]">· {profile.age} yrs</span>
            </div>
            <p className="text-xs text-[#167D83] font-medium flex items-center gap-1 mt-0.5">
              <Heart className="w-3.5 h-3.5 fill-[#167D83]" />
              <span>{memories.length} Personal Memories Loaded</span>
            </p>
          </div>
        </div>
      </section>

      {/* 2. Today's Focus Card: Places You Love */}
      <section aria-labelledby="todays-focus-heading">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#F4A261]" />
            <h2 id="todays-focus-heading" className="text-xl font-semibold text-[#17324D]">
              {t.todaysFocus}
            </h2>
          </div>
          <span className="text-xs text-[#617386]">Specially Curated Morning Activity</span>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-md border border-[#E6EAE5] bg-white group">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[320px]">
            {/* Visual Photo Half */}
            <div className="lg:col-span-7 relative min-h-[240px] lg:min-h-full overflow-hidden bg-[#17324D]">
              <img
                src={templeMemory?.mediaUrl || '/src/assets/images/memory_temple_garden_1791906010869.jpg'}
                alt={templeMemory?.title || 'Kapaleeshwarar Temple Tank'}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent lg:hidden" />
              <div className="absolute bottom-4 left-4 text-white lg:hidden">
                <span className="text-xs uppercase tracking-wider text-[#DDF5EB]">Places You Love</span>
                <p className="font-serif text-lg font-semibold">{templeMemory?.title}</p>
              </div>
            </div>

            {/* Content & Action Half */}
            <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-6 bg-gradient-to-br from-white to-[#FBF8EF]">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#167D83] bg-[#E5EFE7] px-3 py-1 rounded-full">
                  <span>{t.todaysFocusTitle}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#17324D] leading-snug">
                  {templeMemory?.title || t.todaysFocusTitle}
                </h3>

                <p className="text-base text-[#617386] leading-relaxed">
                  {t.todaysFocusDesc}
                </p>

                <div className="text-xs text-[#617386] flex items-center gap-2 pt-1">
                  <Clock className="w-4 h-4 text-[#167D83]" />
                  <span>Gentle pace · 3 relaxing questions · Spoken voice available</span>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => onLaunchGame('photo_recall')}
                  className="w-full py-4 px-6 bg-[#167D83] hover:bg-[#075B60] text-white font-semibold text-lg rounded-2xl shadow-sm transition-all flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>{t.startActivity}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Today's Activities */}
      <section aria-labelledby="todays-activities-heading">
        <div className="flex items-center justify-between mb-4">
          <h2 id="todays-activities-heading" className="text-xl font-semibold text-[#17324D]">
            {t.todaysActivities}
          </h2>
          <button
            type="button"
            onClick={onNavigateToMemories}
            className="text-xs font-semibold text-[#167D83] hover:underline"
          >
            View All Memories →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Activity 1: Photo Recall */}
          <div className="bg-white rounded-3xl p-6 border border-[#E6EAE5] shadow-xs hover:border-[#167D83]/40 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E5EFE7] text-[#167D83] flex items-center justify-center">
                <Heart className="w-6 h-6 fill-[#167D83]/20" />
              </div>
              <h3 className="font-semibold text-lg text-[#17324D]">{t.photoRecallTitle}</h3>
              <p className="text-sm text-[#617386] leading-relaxed">
                {t.photoRecallDesc}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onLaunchGame('photo_recall')}
              className="w-full py-3 bg-[#FBF8EF] hover:bg-[#E5EFE7] text-[#167D83] font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 border border-[#E6EAE5]"
            >
              <span>Play Now</span>
            </button>
          </div>

          {/* Activity 2: Sound & Familiar Voices */}
          <div className="bg-white rounded-3xl p-6 border border-[#E6EAE5] shadow-xs hover:border-[#167D83]/40 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#DDF5EB] text-[#167D83] flex items-center justify-center">
                <Volume2 className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg text-[#17324D]">{t.soundMemoryTitle}</h3>
              <p className="text-sm text-[#617386] leading-relaxed">
                {t.soundMemoryDesc}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                speechService.speak(
                  'Good morning Lakshmi Amma. Priya left a voice note saying she is bringing fresh sweets this evening.',
                  currentLang
                );
              }}
              className="w-full py-3 bg-[#FBF8EF] hover:bg-[#E5EFE7] text-[#167D83] font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 border border-[#E6EAE5]"
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen to Voice Note</span>
            </button>
          </div>

          {/* Activity 3: Sequence Story */}
          <div className="bg-white rounded-3xl p-6 border border-[#E6EAE5] shadow-xs hover:border-[#167D83]/40 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FBF8EF] text-[#F4A261] border border-[#E6EAE5] flex items-center justify-center">
                <ListOrdered className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg text-[#17324D]">{t.storyBuilderTitle}</h3>
              <p className="text-sm text-[#617386] leading-relaxed">
                {t.storyBuilderDesc}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onLaunchGame('story_builder')}
              className="w-full py-3 bg-[#FBF8EF] hover:bg-[#E5EFE7] text-[#167D83] font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 border border-[#E6EAE5]"
            >
              <span>Play Now</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. Choose a Game Section */}
      <section aria-labelledby="choose-game-heading">
        <div className="flex items-center justify-between mb-4">
          <h2 id="choose-game-heading" className="text-xl font-semibold text-[#17324D]">
            {t.chooseGame}
          </h2>
          <span className="text-xs text-[#617386]">4 Gentle Exercises</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Game 1: Photo Recall */}
          <button
            type="button"
            onClick={() => onLaunchGame('photo_recall')}
            className="p-5 rounded-2xl bg-white border border-[#E6EAE5] hover:border-[#167D83] hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#E5EFE7] text-[#167D83] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-[#167D83]" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-[#17324D] mb-1 group-hover:text-[#167D83] transition-colors">
                {t.photoRecallTitle}
              </h3>
              <p className="text-xs text-[#617386] line-clamp-2">
                Recognize family faces and celebrate warm moments.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#167D83] mt-3 inline-flex items-center gap-1">
              Start →
            </span>
          </button>

          {/* Game 2: Object Match */}
          <button
            type="button"
            onClick={() => onLaunchGame('object_match')}
            className="p-5 rounded-2xl bg-white border border-[#E6EAE5] hover:border-[#167D83] hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#DDF5EB] text-[#167D83] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-[#17324D] mb-1 group-hover:text-[#167D83] transition-colors">
                {t.objectMatchTitle}
              </h3>
              <p className="text-xs text-[#617386] line-clamp-2">
                Match everyday household items and rituals.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#167D83] mt-3 inline-flex items-center gap-1">
              Start →
            </span>
          </button>

          {/* Game 3: Story Builder */}
          <button
            type="button"
            onClick={() => onLaunchGame('story_builder')}
            className="p-5 rounded-2xl bg-white border border-[#E6EAE5] hover:border-[#167D83] hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FBF8EF] text-[#F4A261] border border-[#E6EAE5] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-[#17324D] mb-1 group-hover:text-[#167D83] transition-colors">
                {t.storyBuilderTitle}
              </h3>
              <p className="text-xs text-[#617386] line-clamp-2">
                Arrange cherished family stories in sequential order.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#167D83] mt-3 inline-flex items-center gap-1">
              Start →
            </span>
          </button>

          {/* Game 4: Daily Routine */}
          <button
            type="button"
            onClick={() => onLaunchGame('daily_routine')}
            className="p-5 rounded-2xl bg-white border border-[#E6EAE5] hover:border-[#167D83] hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#E5EFE7] text-[#167D83] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-[#17324D] mb-1 group-hover:text-[#167D83] transition-colors">
                {t.dailyRoutineTitle}
              </h3>
              <p className="text-xs text-[#617386] line-clamp-2">
                Arrange peaceful morning tea, garden, and prayer steps.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#167D83] mt-3 inline-flex items-center gap-1">
              Start →
            </span>
          </button>
        </div>
      </section>

      {/* 5. Reassuring Caregiver Note preview */}
      <section className="bg-[#F4F9F6] border border-[#E6EAE5] rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white border border-[#E6EAE5] flex items-center justify-center text-[#167D83] shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-[#17324D]">
              Note from {profile.caregiverName || 'Priya (Daughter)'}
            </h4>
            <p className="text-xs text-[#617386] mt-0.5">
              “Remember to take your time and enjoy the memories, Amma. We love you so much!”
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onNavigateToProgress}
          className="px-4 py-2 text-xs font-semibold text-[#167D83] bg-white hover:bg-[#E5EFE7] rounded-xl border border-[#E6EAE5] transition-colors whitespace-nowrap"
        >
          View Activity History
        </button>
      </section>
    </div>
  );
};
