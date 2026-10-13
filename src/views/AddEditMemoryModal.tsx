import React, { useState } from 'react';
import {
  X,
  Upload,
  Mic,
  MicOff,
  Image as ImageIcon,
  UserPlus,
  Trash2,
  Check,
  Calendar,
  MapPin,
  Sparkles
} from 'lucide-react';
import { Memory, MemoryCategory, RelatedPerson } from '../types';

interface AddEditMemoryModalProps {
  memoryToEdit?: Memory | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (memoryData: Omit<Memory, 'id' | 'createdAt'>, existingId?: string) => void;
}

const CATEGORIES: MemoryCategory[] = [
  'Photos',
  'Voices',
  'People',
  'Places',
  'Stories',
  'Daily Life',
  'Festivals',
  'Special Moments'
];

// Curated library presets if user wants quick presets
const PRESET_IMAGES = [
  {
    title: 'Family Diya Gathering',
    url: '/src/assets/images/memory_family_festive_1791906009099.jpg'
  },
  {
    title: 'Morning Filter Coffee',
    url: '/src/assets/images/memory_morning_tea_1791906009984.jpg'
  },
  {
    title: 'Heritage Temple Tank',
    url: '/src/assets/images/memory_temple_garden_1791906010869.jpg'
  },
  {
    title: 'Sacred Tulsi Planter',
    url: '/src/assets/images/memory_tulsi_plant_1791906010657.jpg'
  },
  {
    title: 'Courtyard Veranda Armchair',
    url: '/src/assets/images/welcome_lakshmi_nature_1791906008255.jpg'
  }
];

export const AddEditMemoryModal: React.FC<AddEditMemoryModalProps> = ({
  memoryToEdit,
  isOpen,
  onClose,
  onSave
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState(memoryToEdit?.title || '');
  const [category, setCategory] = useState<MemoryCategory>(memoryToEdit?.category || 'Photos');
  const [description, setDescription] = useState(memoryToEdit?.description || '');
  const [mediaUrl, setMediaUrl] = useState(
    memoryToEdit?.mediaUrl || '/src/assets/images/memory_family_festive_1791906009099.jpg'
  );
  const [place, setPlace] = useState(memoryToEdit?.place || '');
  const [eventDate, setEventDate] = useState(memoryToEdit?.eventDate || '');
  const [emotionalTag, setEmotionalTag] = useState(memoryToEdit?.emotionalTag || 'Joyful & Warm');
  const [keyPromptQuestion, setKeyPromptQuestion] = useState(
    memoryToEdit?.keyPromptQuestion || 'Who is with you in this memory?'
  );
  const [isRecording, setIsRecording] = useState(false);
  const [hasVoiceNote, setHasVoiceNote] = useState(!!memoryToEdit?.audioVoiceNoteDuration);
  const [people, setPeople] = useState<RelatedPerson[]>(
    memoryToEdit?.relatedPeople || [{ name: 'Priya', relationship: 'Daughter' }]
  );
  const [newPersonName, setNewPersonName] = useState('');
  const [newPersonRelation, setNewPersonRelation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAddPerson = () => {
    if (!newPersonName.trim()) return;
    setPeople([
      ...people,
      {
        name: newPersonName.trim(),
        relationship: newPersonRelation.trim() || 'Family'
      }
    ]);
    setNewPersonName('');
    setNewPersonRelation('');
  };

  const handleRemovePerson = (idx: number) => {
    setPeople(people.filter((_, i) => i !== idx));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setMediaUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleVoiceRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setHasVoiceNote(true);
    } else {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setHasVoiceNote(true);
      }, 3000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Please enter a memory title.');
      return;
    }
    if (!mediaUrl) {
      setErrorMsg('Please provide or select a photo.');
      return;
    }

    setIsSubmitting(true);

    const memoryData: Omit<Memory, 'id' | 'createdAt'> = {
      ownerId: memoryToEdit?.ownerId || 'profile_lakshmi_amma',
      title: title.trim(),
      category,
      description: description.trim(),
      mediaUrl,
      mediaType: 'image',
      relatedPeople: people,
      place: place.trim() || 'Home',
      eventDate: eventDate.trim() || 'Family Moment',
      emotionalTag,
      keyPromptQuestion: keyPromptQuestion.trim(),
      verifiedByCaregiver: true,
      audioVoiceNoteDuration: hasVoiceNote ? '0:28' : undefined,
      isFavorite: memoryToEdit?.isFavorite ?? true
    };

    setTimeout(() => {
      onSave(memoryData, memoryToEdit?.id);
      setIsSubmitting(false);
      onClose();
    }, 250);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E6EAE5] animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#E6EAE5] flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <h2 id="modal-title" className="font-serif text-2xl text-[#17324D]">
              {memoryToEdit ? 'Edit Personal Memory' : 'Add New Family Memory'}
            </h2>
            <p className="text-xs text-[#617386] mt-0.5">
              Caregiver memory curation · Powers personalized cognitive games
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#617386] hover:text-[#17324D] rounded-full hover:bg-[#FBF8EF] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
              {errorMsg}
            </div>
          )}

          {/* 1. Photo Selection & Preview */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-[#17324D]">
              Memory Photo <span className="text-red-500">*</span>
            </label>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              {/* Current Preview */}
              <div className="w-full sm:w-44 h-36 rounded-2xl overflow-hidden bg-[#FBF8EF] border border-[#E6EAE5] shrink-0 relative group">
                <img
                  src={mediaUrl}
                  alt="Memory preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Upload & Preset Options */}
              <div className="flex-1 space-y-2.5 w-full">
                <div className="flex items-center gap-2">
                  <label className="flex-1 py-2.5 px-3 bg-[#E5EFE7] hover:bg-[#DDF5EB] text-[#167D83] text-xs font-semibold rounded-xl border border-[#167D83]/20 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span>Upload Custom Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] text-[#617386] font-medium">
                    Or select from curated family moments:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setMediaUrl(preset.url)}
                        className={`text-[11px] px-2 py-1 rounded-lg border transition-all ${
                          mediaUrl === preset.url
                            ? 'bg-[#167D83] text-white border-[#167D83]'
                            : 'bg-white text-[#17324D] border-[#E6EAE5] hover:bg-[#FBF8EF]'
                        }`}
                      >
                        {preset.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#17324D] mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Deepavali with Priya & Aarav"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6EAE5] text-sm focus:border-[#167D83] focus:ring-1 focus:ring-[#167D83] outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#17324D] mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as MemoryCategory)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6EAE5] text-sm focus:border-[#167D83] focus:ring-1 focus:ring-[#167D83] outline-none bg-white"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Description & Narrative */}
          <div>
            <label className="block text-sm font-semibold text-[#17324D] mb-1">
              Description & Familiar Context
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Add gentle context: who made the tea, what sweets were served, what song was playing..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6EAE5] text-sm focus:border-[#167D83] focus:ring-1 focus:ring-[#167D83] outline-none"
            />
          </div>

          {/* 4. Link Familiar People */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#17324D]">
              Familiar People in this Memory
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {people.map((person, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#E5EFE7] text-[#167D83] text-xs font-medium"
                >
                  <span>{person.name} ({person.relationship})</span>
                  <button
                    type="button"
                    onClick={() => handleRemovePerson(idx)}
                    className="hover:text-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Name (e.g. Aarav)"
                value={newPersonName}
                onChange={e => setNewPersonName(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-[#E6EAE5] text-xs outline-none focus:border-[#167D83]"
              />
              <input
                type="text"
                placeholder="Relation (e.g. Grandson)"
                value={newPersonRelation}
                onChange={e => setNewPersonRelation(e.target.value)}
                className="w-36 px-3 py-2 rounded-xl border border-[#E6EAE5] text-xs outline-none focus:border-[#167D83]"
              />
              <button
                type="button"
                onClick={handleAddPerson}
                className="px-3 py-2 bg-white hover:bg-[#E5EFE7] border border-[#167D83] text-[#167D83] rounded-xl text-xs font-semibold flex items-center gap-1"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* 5. Place and Event Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#17324D] mb-1">
                Place / Sanctuary
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#617386] absolute left-3 top-3" />
                <input
                  type="text"
                  value={place}
                  onChange={e => setPlace(e.target.value)}
                  placeholder="e.g. Mylapore Veranda, Chennai"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#E6EAE5] text-sm focus:border-[#167D83] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#17324D] mb-1">
                Occasion / Time
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-[#617386] absolute left-3 top-3" />
                <input
                  type="text"
                  value={eventDate}
                  onChange={e => setEventDate(e.target.value)}
                  placeholder="e.g. Diwali 2024 / Every Morning"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#E6EAE5] text-sm focus:border-[#167D83] outline-none"
                />
              </div>
            </div>
          </div>

          {/* 6. Voice Recording Note */}
          <div className="p-4 rounded-2xl bg-[#FBF8EF] border border-[#E6EAE5] flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h4 className="text-sm font-semibold text-[#17324D]">
                Family Voice Note Attachment
              </h4>
              <p className="text-xs text-[#617386]">
                {hasVoiceNote
                  ? 'Voice note recorded (0:28 audio preview attached)'
                  : 'Record a gentle 20-second voice greeting to accompany this memory.'}
              </p>
            </div>

            <button
              type="button"
              onClick={handleToggleVoiceRecording}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                isRecording
                  ? 'bg-red-500 text-white animate-pulse'
                  : hasVoiceNote
                  ? 'bg-[#E5EFE7] text-[#167D83] border border-[#167D83]/30'
                  : 'bg-white text-[#17324D] border border-[#E6EAE5] hover:bg-[#E5EFE7]'
              }`}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-[#167D83]" />}
              <span>{isRecording ? 'Recording (Speaking...)' : hasVoiceNote ? 'Re-record Voice' : 'Record Voice'}</span>
            </button>
          </div>

          {/* 7. Game Question Prompt */}
          <div>
            <label className="block text-sm font-semibold text-[#17324D] mb-1">
              Cognitive Game Question
            </label>
            <input
              type="text"
              value={keyPromptQuestion}
              onChange={e => setKeyPromptQuestion(e.target.value)}
              placeholder="e.g. Who is holding the glowing brass diya with you?"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6EAE5] text-sm focus:border-[#167D83] outline-none"
            />
            <p className="text-[11px] text-[#617386] mt-1">
              This question will be read aloud during the Photo Recall activity.
            </p>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-[#E6EAE5] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-[#617386] hover:text-[#17324D] transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-[#167D83] hover:bg-[#075B60] text-white text-sm font-semibold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>{isSubmitting ? 'Saving Memory...' : 'Save to Memory Universe'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
