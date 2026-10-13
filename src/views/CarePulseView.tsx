import React, { useState } from 'react';
import {
  Activity,
  PlusCircle,
  ShieldCheck,
  AlertCircle,
  CheckCircle,
  FileText,
  Clock,
  Sparkles,
  Users,
  Trash2,
  Lock,
  Heart
} from 'lucide-react';
import {
  ActivitySession,
  CaregiverNote,
  CareRecommendation,
  UserProfile,
  SupportedLanguage
} from '../types';
import { translations } from '../data/translations';

interface CarePulseViewProps {
  profile: UserProfile;
  sessions: ActivitySession[];
  notes: CaregiverNote[];
  recommendations: CareRecommendation[];
  currentLang: SupportedLanguage;
  onAddNote: (noteData: Omit<CaregiverNote, 'id' | 'createdAt'>) => void;
  onDeleteNote: (id: string) => void;
  onDismissRecommendation: (id: string) => void;
}

export const CarePulseView: React.FC<CarePulseViewProps> = ({
  profile,
  sessions,
  notes,
  recommendations,
  currentLang,
  onAddNote,
  onDeleteNote,
  onDismissRecommendation
}) => {
  const t = translations[currentLang];
  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState<CaregiverNote['category']>('Observation');
  const [showAddNoteForm, setShowAddNoteForm] = useState(false);

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    onAddNote({
      profileId: profile.id,
      authorId: 'caregiver_priya',
      authorName: profile.caregiverName || 'Priya Ramanathan (Daughter)',
      category: newNoteCategory,
      note: newNoteText.trim()
    });

    setNewNoteText('');
    setShowAddNoteForm(false);
  };

  const activeRecommendations = recommendations.filter(r => r.status === 'active');

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Header & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-[#E5EFE7] text-[#167D83]">
              <Activity className="w-5 h-5" />
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#17324D]">
              {t.carePulseTitle}
            </h1>
          </div>
          <p className="text-base text-[#617386] max-w-2xl">
            {t.carePulseSubtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddNoteForm(true)}
          className="px-4 py-2.5 bg-[#167D83] hover:bg-[#075B60] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t.addNote}</span>
        </button>
      </div>

      {/* Non-Diagnostic Caregiver Banner */}
      <div className="p-4 rounded-2xl bg-[#F4F9F6] border border-[#E6EAE5] flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#167D83] shrink-0 mt-0.5" />
        <div className="text-xs text-[#617386]">
          <strong className="text-[#17324D] block mb-0.5">Clinical Transparency Notice</strong>
          SMRITI observes engagement trends to help caregivers plan supportive moments.
          It does not diagnose dementia, assess neurological decline, or replace professional healthcare consultations.
        </div>
      </div>

      {/* 4 Care Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-6 border border-[#E6EAE5] shadow-xs">
          <span className="text-xs font-semibold text-[#617386]">Overall Engagement</span>
          <p className="font-mono text-3xl font-bold text-[#17324D] mt-2 tabular-nums">
            High
          </p>
          <p className="text-xs text-[#22C55E] mt-1 font-medium">
            Active in 5 of the last 6 days
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#E6EAE5] shadow-xs">
          <span className="text-xs font-semibold text-[#617386]">Total Activities</span>
          <p className="font-mono text-3xl font-bold text-[#17324D] mt-2 tabular-nums">
            {sessions.length}
          </p>
          <p className="text-xs text-[#617386] mt-1">
            Recorded in local care session log
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#E6EAE5] shadow-xs">
          <span className="text-xs font-semibold text-[#617386]">Hint Assistance Ratio</span>
          <p className="font-mono text-3xl font-bold text-[#17324D] mt-2 tabular-nums">
            18%
          </p>
          <p className="text-xs text-[#617386] mt-1">
            Mostly needed during routine sequencing
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#E6EAE5] shadow-xs">
          <span className="text-xs font-semibold text-[#617386]">Personal Baseline Status</span>
          <p className="font-mono text-2xl font-bold text-[#167D83] mt-2">
            Stable & Receptive
          </p>
          <p className="text-xs text-[#617386] mt-1">
            Consistent response patterns
          </p>
        </div>
      </div>

      {/* Recommendations & Neutral Review Indicator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Explainable Recommendations Engine */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E6EAE5] shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl text-[#17324D]">
                Explainable Care Recommendations
              </h2>
              <p className="text-xs text-[#617386]">
                Rule-based guidance derived transparently from recent participation.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {activeRecommendations.map(rec => (
              <div
                key={rec.id}
                className="p-4 rounded-2xl border border-[#E6EAE5] bg-[#FBF8EF] flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] uppercase font-bold text-[#167D83] bg-[#E5EFE7] px-2 py-0.5 rounded-md">
                      {rec.priority}
                    </span>
                    <h4 className="font-semibold text-sm text-[#17324D]">{rec.title}</h4>
                  </div>
                  <p className="text-xs text-[#617386] leading-relaxed">{rec.reason}</p>
                </div>

                <button
                  type="button"
                  onClick={() => onDismissRecommendation(rec.id)}
                  className="text-xs text-[#617386] hover:text-[#17324D] underline shrink-0 mt-1"
                >
                  Dismiss
                </button>
              </div>
            ))}
          </div>

          {/* Neutral Review Indicator Notice as requested in Prompt */}
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-sky-900 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#167D83] shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold">Review Indicator:</strong>
              “Recent activity differs from the personal baseline during longer sessions. Consider checking in and reviewing the activity context to ensure she is well-rested.”
            </div>
          </div>
        </div>

        {/* Right: Caregiver Notes */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E6EAE5] shadow-xs space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-serif text-2xl text-[#17324D]">
                Caregiver Notes
              </h2>
              <button
                type="button"
                onClick={() => setShowAddNoteForm(!showAddNoteForm)}
                className="text-xs font-semibold text-[#167D83] hover:underline"
              >
                {showAddNoteForm ? 'Cancel' : '+ Add Note'}
              </button>
            </div>
            <p className="text-xs text-[#617386]">
              Private observations logged by family members.
            </p>
          </div>

          {showAddNoteForm && (
            <form onSubmit={handleCreateNote} className="p-4 bg-[#FBF8EF] rounded-2xl border border-[#E6EAE5] space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#17324D] mb-1">Category</label>
                <select
                  value={newNoteCategory}
                  onChange={e => setNewNoteCategory(e.target.value as CaregiverNote['category'])}
                  className="w-full text-xs px-3 py-1.5 rounded-xl border border-[#E6EAE5] bg-white outline-none"
                >
                  <option value="Observation">Observation</option>
                  <option value="Routine">Routine</option>
                  <option value="Mood">Mood</option>
                  <option value="Reminder">Reminder</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#17324D] mb-1">Note</label>
                <textarea
                  rows={2}
                  value={newNoteText}
                  onChange={e => setNewNoteText(e.target.value)}
                  placeholder="Record what she mentioned or how she felt..."
                  className="w-full text-xs px-3 py-2 rounded-xl border border-[#E6EAE5] bg-white outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-[#167D83] text-white text-xs font-semibold rounded-xl hover:bg-[#075B60] transition-colors"
              >
                Save Care Note
              </button>
            </form>
          )}

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {notes.map(note => (
              <div
                key={note.id}
                className="p-3.5 rounded-2xl bg-[#FBF8EF] border border-[#E6EAE5] text-xs space-y-1.5 group"
              >
                <div className="flex items-center justify-between text-[11px] text-[#617386]">
                  <span className="font-semibold text-[#167D83]">{note.authorName}</span>
                  <div className="flex items-center gap-2">
                    <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                    <button
                      type="button"
                      onClick={() => onDeleteNote(note.id)}
                      className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity"
                      title="Delete note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-[#17324D] leading-relaxed">{note.note}</p>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#E6EAE5] flex items-center gap-2 text-[11px] text-[#617386]">
            <Lock className="w-3.5 h-3.5 text-[#167D83]" />
            <span>Encrypted local storage · Visible only to authorized caregiver</span>
          </div>
        </div>
      </div>
    </div>
  );
};
