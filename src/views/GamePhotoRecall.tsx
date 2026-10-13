import React, { useState } from 'react';
import {
  Volume2,
  X,
  Sparkles,
  Heart,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  Smile
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Memory, SupportedLanguage, ActivitySession } from '../types';
import { translations } from '../data/translations';
import { speechService } from '../services/speech';

interface GamePhotoRecallProps {
  memories: Memory[];
  currentLang: SupportedLanguage;
  onFinishGame: (sessionData: Omit<ActivitySession, 'id'>) => void;
  onExit: () => void;
}

interface PhotoRecallQuestion {
  id: string;
  memory: Memory;
  question: string;
  options: { text: string; isCorrect: boolean; feedback: string }[];
  hint: string;
}

export const GamePhotoRecall: React.FC<GamePhotoRecallProps> = ({
  memories,
  currentLang,
  onFinishGame,
  onExit
}) => {
  const t = translations[currentLang];

  // Build questions directly from the user's memories
  const generateQuestions = (): PhotoRecallQuestion[] => {
    return memories.slice(0, 4).map((mem, idx) => {
      if (mem.relatedPeople.length > 0) {
        const primaryPerson = mem.relatedPeople[0];
        return {
          id: `q_${idx}`,
          memory: mem,
          question: mem.keyPromptQuestion || `Who is celebrating this beautiful moment with you?`,
          options: [
            {
              text: `${primaryPerson.name} (${primaryPerson.relationship})`,
              isCorrect: true,
              feedback: `Yes! That is your beloved ${primaryPerson.relationship} ${primaryPerson.name}.`
            },
            {
              text: 'A neighbor from the street',
              isCorrect: false,
              feedback: `A very gentle guess, but this is ${primaryPerson.name}.`
            },
            {
              text: 'School teacher',
              isCorrect: false,
              feedback: `Look closely at that warm family smile—it's ${primaryPerson.name}!`
            }
          ],
          hint: `Notice the warm smile and the loving moment you shared together at ${mem.place}.`
        };
      } else {
        return {
          id: `q_${idx}`,
          memory: mem,
          question: mem.keyPromptQuestion || `Where is this peaceful place located?`,
          options: [
            {
              text: mem.place,
              isCorrect: true,
              feedback: `Exactly right! ${mem.place}.`
            },
            {
              text: 'Central Railway Station',
              isCorrect: false,
              feedback: `This peaceful sanctuary is ${mem.place}.`
            },
            {
              text: 'A busy market bazaar',
              isCorrect: false,
              feedback: `Remember the serene morning walk at ${mem.place}.`
            }
          ],
          hint: `It is your favorite calm spot in ${mem.place}.`
        };
      }
    });
  };

  const [questions] = useState<PhotoRecallQuestion[]>(generateQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hintsUsedCount, setHintsUsedCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime] = useState(new Date().toISOString());

  const currentQ = questions[currentIndex];

  const handleSpeak = (text: string) => {
    speechService.speak(text, currentLang);
  };

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return; // already selected
    setSelectedOption(idx);
    const opt = currentQ.options[idx];
    setFeedback(opt.feedback);

    if (opt.isCorrect) {
      setCorrectCount(prev => prev + 1);
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.7 }
      });
    }

    handleSpeak(opt.feedback);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setFeedback(null);
      setShowHint(false);
    } else {
      // Complete activity
      setIsCompleted(true);
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
      handleSpeak('Wonderful! You spent such precious time with your family memories today.');
    }
  };

  const handleFinishAndSave = () => {
    onFinishGame({
      profileId: 'profile_lakshmi_amma',
      activityType: 'photo_recall',
      activityTitle: 'Family Photo Recall',
      startTime,
      completionTime: new Date().toISOString(),
      taskCount: questions.length,
      correctResponses: correctCount,
      hintsUsed: hintsUsedCount,
      userSatisfaction: 'joyful',
      engagementNotes: `Completed ${questions.length} photo recall moments. High engagement with family memories.`
    });
  };

  // Completion screen
  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-6 bg-white rounded-3xl border border-[#E6EAE5] shadow-lg text-center space-y-6">
        <div className="w-20 h-20 bg-[#DDF5EB] rounded-full mx-auto flex items-center justify-center text-[#167D83]">
          <Smile className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase font-semibold text-[#167D83] tracking-wider">
            {t.activityCompleted}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#17324D]">
            {t.wellDone}
          </h2>
          <p className="text-base text-[#617386] max-w-md mx-auto leading-relaxed">
            {t.activitySummary}
          </p>
        </div>

        {/* Clean summary row */}
        <div className="py-4 px-6 bg-[#FBF8EF] rounded-2xl border border-[#E6EAE5] max-w-md mx-auto flex items-center justify-around text-center">
          <div>
            <p className="text-2xl font-bold text-[#167D83]">{questions.length}</p>
            <p className="text-xs text-[#617386]">Memories Explored</p>
          </div>
          <div className="h-8 w-px bg-[#E6EAE5]" />
          <div>
            <p className="text-2xl font-bold text-[#167D83]">{hintsUsedCount}</p>
            <p className="text-xs text-[#617386]">Gentle Hints</p>
          </div>
          <div className="h-8 w-px bg-[#E6EAE5]" />
          <div>
            <p className="text-2xl font-bold text-[#167D83]">100%</p>
            <p className="text-xs text-[#617386]">Comfort & Peace</p>
          </div>
        </div>

        <div className="pt-2 flex justify-center gap-4">
          <button
            type="button"
            onClick={handleFinishAndSave}
            className="px-8 py-3.5 bg-[#167D83] hover:bg-[#075B60] text-white font-semibold text-base rounded-2xl shadow-sm transition-colors cursor-pointer"
          >
            {t.backToHome}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Controls: Exit & Progress Indicator */}
      <div className="bg-white rounded-2xl px-6 py-4 border border-[#E6EAE5] shadow-xs flex items-center justify-between">
        <button
          type="button"
          onClick={onExit}
          className="flex items-center gap-2 text-sm font-semibold text-[#617386] hover:text-[#17324D]"
        >
          <X className="w-5 h-5" />
          <span>Exit Activity</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-[#167D83] uppercase tracking-wide">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <div className="w-28 sm:w-36 h-2.5 bg-[#E5EFE7] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#167D83] rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleSpeak(currentQ.question)}
          className="p-2 text-[#167D83] bg-[#E5EFE7] hover:bg-[#DDF5EB] rounded-xl transition-colors"
          title="Read question aloud"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* Main Task Card */}
      <div className="bg-white rounded-3xl border border-[#E6EAE5] shadow-sm overflow-hidden p-6 sm:p-8 space-y-6">
        {/* Large Familiar Photo */}
        <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] bg-[#FBF8EF] border border-[#E6EAE5] max-h-[380px]">
          <img
            src={currentQ.memory.mediaUrl}
            alt={currentQ.memory.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-xl">
            {currentQ.memory.place}
          </div>
        </div>

        {/* Question Prompt */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#17324D] leading-tight">
            {currentQ.question}
          </h2>
          <p className="text-sm text-[#617386]">
            {t.gentleEncouragement}
          </p>
        </div>

        {/* Large Accessible Answer Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-2">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isChosen = selectedOption !== null;

            return (
              <button
                key={idx}
                type="button"
                disabled={isChosen}
                onClick={() => handleSelectOption(idx)}
                className={`p-5 rounded-2xl text-center font-semibold text-base transition-all border-2 min-h-[92px] flex items-center justify-center cursor-pointer ${
                  isSelected
                    ? option.isCorrect
                      ? 'bg-[#DDF5EB] border-[#22C55E] text-[#17324D] shadow-xs'
                      : 'bg-amber-50 border-amber-300 text-[#17324D]'
                    : isChosen
                    ? 'opacity-60 bg-white border-[#E6EAE5]'
                    : 'bg-white hover:bg-[#FBF8EF] border-[#E6EAE5] hover:border-[#167D83] text-[#17324D]'
                }`}
              >
                <span>{option.text}</span>
              </button>
            );
          })}
        </div>

        {/* Gentle Feedback & Next Button */}
        {feedback && (
          <div className="p-4 rounded-2xl bg-[#F4F9F6] border border-[#167D83]/20 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E5EFE7] text-[#167D83] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium text-[#17324D]">
                {feedback}
              </p>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-3 bg-[#167D83] hover:bg-[#075B60] text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>{currentIndex < questions.length - 1 ? t.nextQuestion : t.finishActivity}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Hint accordion */}
        {!selectedOption && (
          <div className="text-center pt-2">
            {!showHint ? (
              <button
                type="button"
                onClick={() => {
                  setShowHint(true);
                  setHintsUsedCount(prev => prev + 1);
                  handleSpeak(currentQ.hint);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#167D83] hover:underline"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Need a gentle hint?</span>
              </button>
            ) : (
              <p className="text-xs text-[#617386] bg-[#FBF8EF] py-2 px-4 rounded-xl inline-block border border-[#E6EAE5]">
                {currentQ.hint}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
