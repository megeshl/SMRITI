import React from 'react';
import {
  TrendingUp,
  Calendar,
  CheckCircle2,
  Heart,
  Clock,
  Sparkles,
  Info,
  Layers
} from 'lucide-react';
import { ActivitySession, SupportedLanguage } from '../types';
import { translations } from '../data/translations';

interface MyProgressViewProps {
  sessions: ActivitySession[];
  currentLang: SupportedLanguage;
}

export const MyProgressView: React.FC<MyProgressViewProps> = ({
  sessions,
  currentLang
}) => {
  const t = translations[currentLang];

  const totalCompleted = sessions.length;
  const totalTasks = sessions.reduce((acc, s) => acc + s.taskCount, 0);
  const totalHints = sessions.reduce((acc, s) => acc + s.hintsUsed, 0);

  // Group by activity type
  const countsByType = {
    photo_recall: sessions.filter(s => s.activityType === 'photo_recall').length,
    daily_routine: sessions.filter(s => s.activityType === 'daily_routine').length,
    object_match: sessions.filter(s => s.activityType === 'object_match').length,
    story_builder: sessions.filter(s => s.activityType === 'story_builder').length
  };

  // Recent 5 sessions
  const recentSessions = sessions.slice(0, 5);

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Header & Demo Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#17324D]">
            {t.navProgress}
          </h1>
          <p className="text-base text-[#617386] mt-1 max-w-2xl">
            Gentle visualization of activity history, personal participation, and comforting trends.
          </p>
        </div>

        {/* Demo Data Notice */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#E5EFE7] border border-[#167D83]/20 text-[#167D83] text-xs font-semibold shrink-0">
          <Info className="w-4 h-4" />
          <span>Demonstration Data (Lakshmi Amma, 72)</span>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Activities Completed */}
        <div className="bg-white rounded-3xl p-6 border border-[#E6EAE5] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#617386]">Activities Completed</span>
            <div className="p-2 rounded-xl bg-[#E5EFE7] text-[#167D83]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <p className="font-mono text-3xl font-bold text-[#17324D] tabular-nums">
            {totalCompleted}
          </p>
          <p className="text-xs text-[#617386] mt-1">
            Across 4 cognitive memory activities
          </p>
        </div>

        {/* Card 2: Active Days */}
        <div className="bg-white rounded-3xl p-6 border border-[#E6EAE5] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#617386]">Active Days This Month</span>
            <div className="p-2 rounded-xl bg-[#DDF5EB] text-[#167D83]">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <p className="font-mono text-3xl font-bold text-[#17324D] tabular-nums">
            18 / 30
          </p>
          <p className="text-xs text-[#22C55E] font-medium mt-1">
            Participation has been consistent
          </p>
        </div>

        {/* Card 3: Memory Moments */}
        <div className="bg-white rounded-3xl p-6 border border-[#E6EAE5] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#617386]">Memories Revisited</span>
            <div className="p-2 rounded-xl bg-[#FBF8EF] text-[#F4A261] border border-[#E6EAE5]">
              <Heart className="w-5 h-5 fill-current" />
            </div>
          </div>
          <p className="font-mono text-3xl font-bold text-[#17324D] tabular-nums">
            {totalTasks}
          </p>
          <p className="text-xs text-[#617386] mt-1">
            Family photos & daily rituals explored
          </p>
        </div>

        {/* Card 4: Independence Rate */}
        <div className="bg-white rounded-3xl p-6 border border-[#E6EAE5] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#617386]">Comfort & Ease</span>
            <div className="p-2 rounded-xl bg-[#E5EFE7] text-[#167D83]">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <p className="font-mono text-3xl font-bold text-[#17324D] tabular-nums">
            94%
          </p>
          <p className="text-xs text-[#617386] mt-1">
            Completed with high peace and zero distress
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Activity Participation by Category */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E6EAE5] shadow-xs space-y-6">
          <div>
            <h2 className="font-serif text-2xl text-[#17324D]">
              Activity Distribution
            </h2>
            <p className="text-xs text-[#617386] mt-0.5">
              Breakdown of favorite cognitive exercises engaged with recently.
            </p>
          </div>

          {/* Accessible Bar Visualizer */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-[#17324D]">Photo Recall (Faces & Loved Places)</span>
                <span className="font-mono tabular-nums text-[#167D83]">{countsByType.photo_recall} sessions</span>
              </div>
              <div className="h-4 bg-[#FBF8EF] rounded-full overflow-hidden border border-[#E6EAE5]">
                <div
                  className="h-full bg-[#167D83] rounded-full"
                  style={{ width: `${Math.max(20, (countsByType.photo_recall / (totalCompleted || 1)) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-[#17324D]">Daily Routine Sequencing</span>
                <span className="font-mono tabular-nums text-[#167D83]">{countsByType.daily_routine} sessions</span>
              </div>
              <div className="h-4 bg-[#FBF8EF] rounded-full overflow-hidden border border-[#E6EAE5]">
                <div
                  className="h-full bg-[#22C55E] rounded-full"
                  style={{ width: `${Math.max(15, (countsByType.daily_routine / (totalCompleted || 1)) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-[#17324D]">Object Match (Traditional Items)</span>
                <span className="font-mono tabular-nums text-[#167D83]">{countsByType.object_match} sessions</span>
              </div>
              <div className="h-4 bg-[#FBF8EF] rounded-full overflow-hidden border border-[#E6EAE5]">
                <div
                  className="h-full bg-[#8ED8EE] rounded-full"
                  style={{ width: `${Math.max(15, (countsByType.object_match / (totalCompleted || 1)) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-[#17324D]">Story Builder (Festivals & Gatherings)</span>
                <span className="font-mono tabular-nums text-[#167D83]">{countsByType.story_builder} sessions</span>
              </div>
              <div className="h-4 bg-[#FBF8EF] rounded-full overflow-hidden border border-[#E6EAE5]">
                <div
                  className="h-full bg-[#F4A261] rounded-full"
                  style={{ width: `${Math.max(15, (countsByType.story_builder / (totalCompleted || 1)) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FBF8EF] border border-[#E6EAE5] text-xs text-[#617386]">
            <strong className="text-[#17324D]">Activity Insight:</strong> Photo activities were completed most often this week. Lakshmi Amma responds with immediate joy to family photos of Priya and Aarav.
          </div>
        </div>

        {/* Personal Baseline Analysis */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E6EAE5] shadow-xs space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-5 h-5 text-[#167D83]" />
              <h2 className="font-serif text-2xl text-[#17324D]">
                Personal Baseline
              </h2>
            </div>
            <p className="text-xs text-[#617386]">
              Compared only against Lakshmi Amma's own recorded history.
            </p>
          </div>

          <div className="space-y-3.5">
            <div className="p-3.5 rounded-2xl bg-[#E5EFE7] border border-[#167D83]/20">
              <h4 className="text-xs font-bold text-[#167D83] uppercase tracking-wide mb-0.5">
                Participation Consistency
              </h4>
              <p className="text-xs text-[#17324D] leading-relaxed">
                Participation has been remarkably steady. Morning sessions between 9:30 AM and 10:30 AM yield the highest satisfaction.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#DDF5EB] border border-[#22C55E]/30">
              <h4 className="text-xs font-bold text-[#075B60] uppercase tracking-wide mb-0.5">
                Visual Face Recall
              </h4>
              <p className="text-xs text-[#17324D] leading-relaxed">
                Photo activities were completed with ease and high enthusiasm.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FBF8EF] border border-[#E6EAE5]">
              <h4 className="text-xs font-bold text-[#F4A261] uppercase tracking-wide mb-0.5">
                Sequencing Support
              </h4>
              <p className="text-xs text-[#17324D] leading-relaxed">
                This activity benefits from voiceover audio instructions and keeping steps to 4 or fewer.
              </p>
            </div>
          </div>

          <p className="text-[11px] text-[#617386] italic">
            * SMRITI never presents scores as clinical assessments or medical diagnoses.
          </p>
        </div>
      </div>

      {/* Recent Activity Log Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6EAE5] shadow-xs space-y-4">
        <div>
          <h3 className="font-serif text-xl text-[#17324D]">
            Recent Activity Log
          </h3>
          <p className="text-xs text-[#617386]">
            Every session recorded locally with timestamp and caregiver observations.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E6EAE5] text-[#617386] font-semibold">
                <th className="py-3 px-3">Activity</th>
                <th className="py-3 px-3">Date & Time</th>
                <th className="py-3 px-3 text-right">Tasks</th>
                <th className="py-3 px-3 text-right">Hints Used</th>
                <th className="py-3 px-3">Caregiver Engagement Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6EAE5]">
              {recentSessions.map(sess => (
                <tr key={sess.id} className="hover:bg-[#FBF8EF]/60 transition-colors">
                  <td className="py-3 px-3 font-semibold text-[#17324D]">
                    {sess.activityTitle}
                  </td>
                  <td className="py-3 px-3 text-[#617386]">
                    {new Date(sess.startTime).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric'
                    })} · {new Date(sess.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="py-3 px-3 font-mono tabular-nums text-right text-[#17324D]">
                    {sess.taskCount}
                  </td>
                  <td className="py-3 px-3 font-mono tabular-nums text-right text-[#617386]">
                    {sess.hintsUsed}
                  </td>
                  <td className="py-3 px-3 text-[#617386] max-w-xs truncate">
                    {sess.engagementNotes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
