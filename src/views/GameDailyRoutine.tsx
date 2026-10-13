import React, { useState } from 'react';
import { Volume2, X, ArrowUp, ArrowDown, Clock, Smile } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SupportedLanguage, ActivitySession } from '../types';
import { translations } from '../data/translations';
import { speechService } from '../services/speech';

interface GameDailyRoutineProps {
  currentLang: SupportedLanguage;
  onFinishGame: (sessionData: Omit<ActivitySession, 'id'>) => void;
  onExit: () => void;
}

interface RoutineStep {
  id: string;
  order: number;
  timeHint: string;
  title: string;
  description: string;
}

const DEFAULT_ROUTINE: RoutineStep[] = [
  {
    id: 'r1',
    order: 1,
    timeHint: '6:00 AM',
    title: '1. Wake up gently to morning birdsong',
    description: 'Slow deep breathing, gentle stretch, and open the bedroom window.'
  },
  {
    id: 'r2',
    order: 2,
    timeHint: '6:30 AM',
    title: '2. Enjoy warm filter coffee on the veranda',
    description: 'Hot frothy chicory coffee in the brass tumbler while sitting in the teak chair.'
  },
  {
    id: 'r3',
    order: 3,
    timeHint: '7:15 AM',
    title: '3. Water the sacred Tulsi plant',
    description: 'Offer clean water to the courtyard Brindavan and place fresh flowers.'
  },
  {
    id: 'r4',
    order: 4,
    timeHint: '8:00 AM',
    title: '4. Light breakfast & morning temple chant',
    description: 'Warm idlis with coconut chutney and listening to M.S. Subbulakshmi suprabhatam.'
  }
];

export const GameDailyRoutine: React.FC<GameDailyRoutineProps> = ({
  currentLang,
  onFinishGame,
  onExit
}) => {
  const t = translations[currentLang];
  // Scramble steps for sequencing
  const [steps, setSteps] = useState<RoutineStep[]>([
    DEFAULT_ROUTINE[1],
    DEFAULT_ROUTINE[3],
    DEFAULT_ROUTINE[0],
    DEFAULT_ROUTINE[2]
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
      setFeedback('Wonderful! Your peaceful morning routine is perfectly ordered.');
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      speechService.speak('Wonderful! Your morning routine is in peaceful order.', currentLang);
      setTimeout(() => setIsCompleted(true), 1200);
    } else {
      setFeedback('Close! Consider whether filter coffee comes before or after waking up.');
      speechService.speak('You are very close! Try adjusting the morning sequence.', currentLang);
    }
  };

  const handleFinish = () => {
    onFinishGame({
      profileId: 'profile_lakshmi_amma',
      activityType: 'daily_routine',
      activityTitle: 'Morning Garden & Tea Routine',
      startTime,
      completionTime: new Date().toISOString(),
      taskCount: steps.length,
      correctResponses: steps.length,
      hintsUsed: 0,
      userSatisfaction: 'calm',
      engagementNotes: 'Arranged daily morning routine steps calmly and accurately.'
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
          Your daily morning routine is organized with clarity and calm.
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
          Daily Routine Sequencing
        </span>
        <button
          type="button"
          onClick={() =>
            speechService.speak(
              'Arrange these steps to form your familiar morning routine.',
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
            Lakshmi Amma's Morning Routine
          </h2>
          <p className="text-sm text-[#617386]">
            Arrange your comforting morning steps from dawn to breakfast.
          </p>
        </div>

        <div className="space-y-3">
          {steps.map((step, idx) => (
            <div
              key={step.id}
              className="p-4 rounded-2xl bg-[#FBF8EF] border border-[#E6EAE5] flex items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#167D83]" />
                  <span className="text-xs font-semibold text-[#167D83]">{step.timeHint}</span>
                </div>
                <h4 className="font-semibold text-base text-[#17324D]">{step.title}</h4>
                <p className="text-xs text-[#617386] mt-0.5">{step.description}</p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleMoveUp(idx)}
                  className="p-2 rounded-xl bg-white border border-[#E6EAE5] text-[#167D83] hover:bg-[#E5EFE7] disabled:opacity-30 disabled:hover:bg-white transition-colors"
                  title="Move Up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={idx === steps.length - 1}
                  onClick={() => handleMoveDown(idx)}
                  className="p-2 rounded-xl bg-white border border-[#E6EAE5] text-[#167D83] hover:bg-[#E5EFE7] disabled:opacity-30 disabled:hover:bg-white transition-colors"
                  title="Move Down"
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
            Check Routine Order
          </button>
        </div>
      </div>
    </div>
  );
};
