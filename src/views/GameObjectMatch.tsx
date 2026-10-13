import React, { useState } from 'react';
import { Volume2, X, CheckCircle2, ArrowRight, Smile, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SupportedLanguage, ActivitySession } from '../types';
import { translations } from '../data/translations';
import { speechService } from '../services/speech';

interface GameObjectMatchProps {
  currentLang: SupportedLanguage;
  onFinishGame: (sessionData: Omit<ActivitySession, 'id'>) => void;
  onExit: () => void;
}

interface MatchPair {
  id: string;
  item: string;
  association: string;
  category: string;
  hint: string;
  imageUrl?: string;
}

const PAIRS: MatchPair[] = [
  {
    id: 'p1',
    item: 'Brass Filter Coffee Tumbler',
    association: 'Morning 6:30 AM Veranda Ritual',
    category: 'Daily Routine',
    hint: 'Brewed fresh every morning with hot milk in the kitchen.',
    imageUrl: '/src/assets/images/memory_morning_tea_1791906009984.jpg'
  },
  {
    id: 'p2',
    item: 'Fresh Madurai Jasmine Garland',
    association: 'Pleasant Fragrance for Hair & Worship',
    category: 'Tradition',
    hint: 'White flowers bought fresh from the morning temple vendor.',
    imageUrl: '/src/assets/images/memory_morning_tea_1791906009984.jpg'
  },
  {
    id: 'p3',
    item: 'Auspicious Brass Diya (Deepam)',
    association: 'Deepavali Festival of Lights',
    category: 'Festivals',
    hint: 'Lit with gingelly oil and cotton wick alongside Priya and Aarav.',
    imageUrl: '/src/assets/images/memory_family_festive_1791906009099.jpg'
  },
  {
    id: 'p4',
    item: 'Sacred Tulsi Plant Planter',
    association: 'Watering & Morning Prayers',
    category: 'Devotion',
    hint: 'Nurtured daily on the sunny veranda courtyard.',
    imageUrl: '/src/assets/images/memory_tulsi_plant_1791906010657.jpg'
  }
];

export const GameObjectMatch: React.FC<GameObjectMatchProps> = ({
  currentLang,
  onFinishGame,
  onExit
}) => {
  const t = translations[currentLang];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime] = useState(new Date().toISOString());

  const currentPair = PAIRS[currentIndex];

  // Distractor options
  const options = React.useMemo(() => {
    const correct = currentPair.association;
    const others = PAIRS.filter(p => p.id !== currentPair.id).map(p => p.association);
    const shuffled = [correct, ...others.slice(0, 2)].sort(() => 0.5 - Math.random());
    return shuffled;
  }, [currentIndex, currentPair]);

  const handleSpeak = (text: string) => {
    speechService.speak(text, currentLang);
  };

  const handleSelect = (assoc: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(assoc);

    if (assoc === currentPair.association) {
      setFeedback(`Wonderful! The ${currentPair.item} belongs to ${currentPair.association}.`);
      confetti({ particleCount: 25, spread: 50, origin: { y: 0.7 } });
      handleSpeak(`Wonderful! ${currentPair.item} is for ${currentPair.association}.`);
    } else {
      setFeedback(`A very sweet thought. The ${currentPair.item} is best known for ${currentPair.association}.`);
      handleSpeak(`The ${currentPair.item} is connected to ${currentPair.association}.`);
    }
  };

  const handleNext = () => {
    if (currentIndex < PAIRS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setFeedback(null);
    } else {
      setIsCompleted(true);
      confetti({ particleCount: 75, spread: 80, origin: { y: 0.6 } });
    }
  };

  const handleFinish = () => {
    onFinishGame({
      profileId: 'profile_lakshmi_amma',
      activityType: 'object_match',
      activityTitle: 'Everyday Household Object Match',
      startTime,
      completionTime: new Date().toISOString(),
      taskCount: PAIRS.length,
      correctResponses: PAIRS.length,
      hintsUsed: 0,
      userSatisfaction: 'calm',
      engagementNotes: 'Matched everyday traditional objects with ease.'
    });
  };

  if (isCompleted) {
    return (
      <div className="max-w-xl mx-auto py-12 px-6 bg-white rounded-3xl border border-[#E6EAE5] shadow-lg text-center space-y-6">
        <div className="w-20 h-20 bg-[#DDF5EB] rounded-full mx-auto flex items-center justify-center text-[#167D83]">
          <Smile className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-3xl text-[#17324D]">{t.wellDone}</h2>
        <p className="text-sm text-[#617386]">
          All everyday household objects and traditional rituals matched with joy!
        </p>
        <button
          type="button"
          onClick={handleFinish}
          className="px-8 py-3.5 bg-[#167D83] text-white font-semibold rounded-2xl hover:bg-[#075B60] transition-colors"
        >
          {t.backToHome}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Top Header */}
      <div className="bg-white rounded-2xl px-6 py-4 border border-[#E6EAE5] shadow-xs flex items-center justify-between">
        <button
          type="button"
          onClick={onExit}
          className="flex items-center gap-2 text-sm font-semibold text-[#617386] hover:text-[#17324D]"
        >
          <X className="w-5 h-5" />
          <span>Exit</span>
        </button>
        <span className="text-xs font-semibold text-[#167D83] uppercase">
          Object {currentIndex + 1} of {PAIRS.length}
        </span>
        <button
          type="button"
          onClick={() => handleSpeak(`What is the familiar ritual for: ${currentPair.item}?`)}
          className="p-2 text-[#167D83] bg-[#E5EFE7] rounded-xl"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* Task Card */}
      <div className="bg-white rounded-3xl border border-[#E6EAE5] p-6 sm:p-8 space-y-6">
        {currentPair.imageUrl && (
          <div className="h-48 rounded-2xl overflow-hidden bg-[#FBF8EF] border border-[#E6EAE5]">
            <img
              src={currentPair.imageUrl}
              alt={currentPair.item}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-semibold text-[#167D83] bg-[#E5EFE7] px-3 py-1 rounded-full">
            {currentPair.category}
          </span>
          <h2 className="font-serif text-3xl text-[#17324D]">
            {currentPair.item}
          </h2>
          <p className="text-sm text-[#617386]">
            Which beloved ritual or moment connects with this item?
          </p>
        </div>

        {/* Association Options */}
        <div className="space-y-3 max-w-lg mx-auto">
          {options.map((opt, idx) => {
            const isSelected = selectedOption === opt;
            const isCorrect = opt === currentPair.association;

            return (
              <button
                key={idx}
                type="button"
                disabled={selectedOption !== null}
                onClick={() => handleSelect(opt)}
                className={`w-full p-4 rounded-2xl text-left font-semibold text-base transition-all border-2 flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? isCorrect
                      ? 'bg-[#DDF5EB] border-[#22C55E] text-[#17324D]'
                      : 'bg-amber-50 border-amber-300 text-[#17324D]'
                    : selectedOption !== null
                    ? 'opacity-60 bg-white border-[#E6EAE5]'
                    : 'bg-white hover:bg-[#FBF8EF] border-[#E6EAE5] hover:border-[#167D83] text-[#17324D]'
                }`}
              >
                <span>{opt}</span>
                {isSelected && <CheckCircle2 className="w-5 h-5 text-[#167D83] shrink-0" />}
              </button>
            );
          })}
        </div>

        {feedback && (
          <div className="p-4 rounded-2xl bg-[#F4F9F6] border border-[#167D83]/20 flex items-center justify-between gap-4 max-w-lg mx-auto">
            <p className="text-xs font-semibold text-[#17324D]">{feedback}</p>
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2.5 bg-[#167D83] hover:bg-[#075B60] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shrink-0"
            >
              <span>{currentIndex < PAIRS.length - 1 ? 'Next' : 'Finish'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
