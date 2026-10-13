import React, { useState } from 'react';
import { Volume2, X, ArrowUp, ArrowDown, Check, Smile, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SupportedLanguage, ActivitySession } from '../types';
import { translations } from '../data/translations';
import { speechService } from '../services/speech';

interface GameStoryBuilderProps {
  currentLang: SupportedLanguage;
  onFinishGame: (sessionData: Omit<ActivitySession, 'id'>) => void;
  onExit: () => void;
}

interface StoryStep {
  id: string;
  order: number;
  text: string;
  detail: string;
}

const INITIAL_STORY: StoryStep[] = [
  {
    id: 's1',
    order: 1,
    text: '1. Daughter Priya brings fresh festive sweets',
    detail: 'Warm Mysore Pak prepared in the kitchen in the morning.'
  },
  {
    id: 's2',
    order: 2,
    text: '2. Grandson Aarav dresses up in his new silk kurta',
    detail: 'Smiling proudly and helping arrange the brass plates.'
  },
  {
    id: 's3',
    order: 3,
    text: '3. Lighting the auspicious brass Diya together',
    detail: 'All three hands gently holding the glowing light.'
  },
  {
    id: 's4',
    order: 4,
    text: '4. Sharing evening prayers and blessings',
    detail: 'A peaceful, joyful family celebration.'
  }
];

export const GameStoryBuilder: React.FC<GameStoryBuilderProps> = ({
  currentLang,
  onFinishGame,
  onExit
}) => {
  const t = translations[currentLang];
  // Scramble the order for the puzzle
  const [steps, setSteps] = useState<StoryStep[]>([
    INITIAL_STORY[2],
    INITIAL_STORY[0],
    INITIAL_STORY[3],
    INITIAL_STORY[1]
  ]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime] = useState(new Date().toISOString());

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newSteps = [...steps];
    const temp = newSteps[index - 1];
    newSteps[index - 1] = newSteps[index];
    newSteps[index] = temp;
    setSteps(newSteps);
    setFeedback(null);
  };

  const handleMoveDown = (index: number) => {
    if (index === steps.length - 1) return;
    const newSteps = [...steps];
    const temp = newSteps[index + 1];
    newSteps[index + 1] = newSteps[index];
    newSteps[index] = temp;
    setSteps(newSteps);
    setFeedback(null);
  };

  const handleCheckOrder = () => {
    const isCorrect = steps.every((s, i) => s.order === i + 1);
    if (isCorrect) {
      setFeedback('Wonderful! The family story unfolds in perfect harmony.');
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      speechService.speak('Wonderful! The family Diwali story is perfectly arranged.', currentLang);
      setTimeout(() => setIsCompleted(true), 1200);
    } else {
      setFeedback('You are very close! Notice what happened before lighting the lamps.');
      speechService.speak('Almost there! Let’s adjust the order gently.', currentLang);
    }
  };

  const handleFinish = () => {
    onFinishGame({
      profileId: 'profile_lakshmi_amma',
      activityType: 'story_builder',
      activityTitle: 'Diwali Celebration Story Builder',
      startTime,
      completionTime: new Date().toISOString(),
      taskCount: steps.length,
      correctResponses: steps.length,
      hintsUsed: 1,
      userSatisfaction: 'joyful',
      engagementNotes: 'Sequenced family Diwali memories with smiles.'
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
          The family Deepavali story has been beautifully put in sequence!
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
          Story Sequencing Activity
        </span>
        <button
          type="button"
          onClick={() =>
            speechService.speak(
              'Arrange these steps to tell the story of your family Diwali evening.',
              currentLang
            )
          }
          className="p-2 text-[#167D83] bg-[#E5EFE7] rounded-xl"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-[#E6EAE5] p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-3xl text-[#17324D]">
            Diwali Evening with Priya & Aarav
          </h2>
          <p className="text-sm text-[#617386]">
            Use the Up and Down buttons to arrange what happened first, second, and next.
          </p>
        </div>

        {/* Steps Cards */}
        <div className="space-y-3">
          {steps.map((step, idx) => (
            <div
              key={step.id}
              className="p-4 rounded-2xl bg-[#FBF8EF] border border-[#E6EAE5] flex items-center justify-between gap-4 transition-all"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-base text-[#17324D]">{step.text}</h4>
                <p className="text-xs text-[#617386] mt-0.5">{step.detail}</p>
              </div>

              {/* Accessible Non-Drag Move Buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleMoveUp(idx)}
                  className="p-2 rounded-xl bg-white border border-[#E6EAE5] text-[#167D83] hover:bg-[#E5EFE7] disabled:opacity-30 disabled:hover:bg-white transition-colors"
                  title="Move Step Up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={idx === steps.length - 1}
                  onClick={() => handleMoveDown(idx)}
                  className="p-2 rounded-xl bg-white border border-[#E6EAE5] text-[#167D83] hover:bg-[#E5EFE7] disabled:opacity-30 disabled:hover:bg-white transition-colors"
                  title="Move Step Down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {feedback && (
          <div className="p-3 bg-[#E5EFE7] text-[#167D83] text-center rounded-xl text-xs font-semibold">
            {feedback}
          </div>
        )}

        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={handleCheckOrder}
            className="px-8 py-3.5 bg-[#167D83] hover:bg-[#075B60] text-white font-semibold text-base rounded-2xl shadow-sm transition-colors cursor-pointer"
          >
            Check Story Order
          </button>
        </div>
      </div>
    </div>
  );
};
