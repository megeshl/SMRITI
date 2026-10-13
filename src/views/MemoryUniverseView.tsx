import React, { useState } from 'react';
import {
  Search,
  PlusCircle,
  Volume2,
  MapPin,
  Calendar,
  Users,
  Edit3,
  Trash2,
  Sparkles,
  Heart,
  AlertTriangle
} from 'lucide-react';
import { Memory, MemoryCategory, SupportedLanguage } from '../types';
import { translations } from '../data/translations';
import { speechService } from '../services/speech';

interface MemoryUniverseViewProps {
  memories: Memory[];
  currentLang: SupportedLanguage;
  onOpenAddModal: () => void;
  onOpenEditModal: (memory: Memory) => void;
  onDeleteMemory: (id: string) => void;
}

const CATEGORIES: ('All' | MemoryCategory)[] = [
  'All',
  'Photos',
  'Voices',
  'People',
  'Places',
  'Stories',
  'Daily Life',
  'Festivals',
  'Special Moments'
];

export const MemoryUniverseView: React.FC<MemoryUniverseViewProps> = ({
  memories,
  currentLang,
  onOpenAddModal,
  onOpenEditModal,
  onDeleteMemory
}) => {
  const t = translations[currentLang];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | MemoryCategory>('All');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Filter memories
  const filteredMemories = memories.filter(memory => {
    const matchesCategory =
      selectedCategory === 'All' || memory.category === selectedCategory;
    const matchesSearch =
      memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.place.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.relatedPeople.some(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const handlePlayVoice = (memory: Memory) => {
    const textToRead = `${memory.title}. In ${memory.place}. ${memory.description}`;
    speechService.speak(textToRead, currentLang);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Header & Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#17324D]">
            {t.myMemoriesTitle}
          </h1>
          <p className="text-base text-[#617386] mt-1 max-w-2xl">
            {t.myMemoriesSubtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenAddModal}
          className="px-5 py-3 bg-[#167D83] hover:bg-[#075B60] text-white font-semibold text-sm rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-5 h-5" />
          <span>{t.addMemory}</span>
        </button>
      </div>

      {/* Search Bar & Interactive Category Filter Tabs */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#617386] absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t.searchMemories}
            className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-[#E6EAE5] text-sm text-[#17324D] placeholder-[#617386] focus:border-[#167D83] focus:ring-1 focus:ring-[#167D83] outline-none shadow-xs"
          />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors shrink-0 ${
                  isSelected
                    ? 'bg-[#167D83] text-white shadow-xs'
                    : 'bg-white hover:bg-[#E5EFE7] text-[#617386] hover:text-[#17324D] border border-[#E6EAE5]'
                }`}
              >
                {cat === 'All' ? t.allCategories : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Memory Grid */}
      {filteredMemories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMemories.map(memory => (
            <article
              key={memory.id}
              className="bg-white rounded-3xl border border-[#E6EAE5] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Photo container */}
                <div className="relative aspect-[4/3] bg-[#FBF8EF] overflow-hidden">
                  <img
                    src={memory.mediaUrl}
                    alt={memory.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-xl text-[11px] font-semibold text-[#17324D] shadow-xs">
                    {memory.category}
                  </div>

                  {/* Voice player shortcut button */}
                  <button
                    type="button"
                    onClick={() => handlePlayVoice(memory)}
                    title="Listen to memory narration"
                    className="absolute bottom-3 right-3 p-2 bg-[#167D83] text-white rounded-full shadow-md hover:bg-[#075B60] transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="font-serif text-lg font-bold text-[#17324D] line-clamp-1">
                    {memory.title}
                  </h3>

                  <p className="text-xs text-[#617386] line-clamp-3 leading-relaxed">
                    {memory.description}
                  </p>

                  {/* Metadata Row */}
                  <div className="pt-2 border-t border-[#E6EAE5] space-y-1.5 text-[11px] text-[#617386]">
                    {memory.place && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#167D83] shrink-0" />
                        <span className="truncate">{memory.place}</span>
                      </div>
                    )}

                    {memory.eventDate && (
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#167D83] shrink-0" />
                        <span>{memory.eventDate}</span>
                      </div>
                    )}

                    {memory.relatedPeople.length > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#167D83] shrink-0" />
                        <span className="truncate">
                          {memory.relatedPeople.map(p => `${p.name} (${p.relationship})`).join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="px-5 py-3 border-t border-[#E6EAE5] bg-[#FBF8EF]/60 flex items-center justify-between">
                <span className="text-[11px] text-[#167D83] font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Cognitive Ready</span>
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onOpenEditModal(memory)}
                    className="p-1.5 text-[#617386] hover:text-[#167D83] hover:bg-white rounded-lg transition-colors"
                    title="Edit memory"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(memory.id)}
                    className="p-1.5 text-[#617386] hover:text-red-600 hover:bg-white rounded-lg transition-colors"
                    title="Delete memory"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E6EAE5] max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#E5EFE7] text-[#167D83] mx-auto flex items-center justify-center">
            <Heart className="w-8 h-8 fill-[#167D83]/20" />
          </div>
          <h3 className="font-serif text-2xl text-[#17324D]">No memories found</h3>
          <p className="text-sm text-[#617386]">
            {searchQuery
              ? `No memories matched "${searchQuery}". Try a different keyword or reset filters.`
              : 'Add cherished family photographs, beloved songs, and places to power personalized games for Lakshmi Amma.'}
          </p>
          <button
            type="button"
            onClick={onOpenAddModal}
            className="px-6 py-3 bg-[#167D83] text-white rounded-xl text-sm font-semibold hover:bg-[#075B60] transition-colors"
          >
            Add First Memory
          </button>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div
          role="alertdialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-[#E6EAE5] shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-[#17324D]">
              Remove this memory?
            </h3>
            <p className="text-xs text-[#617386] leading-relaxed">
              Are you sure you want to delete this memory? It will no longer appear in personalized
              cognitive games.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-semibold text-[#617386] hover:text-[#17324D]"
              >
                Keep Memory
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteMemory(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-2 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-xs"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
