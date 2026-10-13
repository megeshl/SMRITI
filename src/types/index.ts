export type SupportedLanguage = 'en' | 'ta' | 'hi' | 'as';

export type UserRole = 'elderly' | 'caregiver';

export interface AccessibilityPreferences {
  fontSize: 'normal' | 'large' | 'xlarge';
  highContrast: boolean;
  spokenAudio: boolean;
  simpleMode: boolean;
  reduceMotion: boolean;
}

export interface ConsentSettings {
  shareWithCaregiver: boolean;
  shareAnonymousPatterns: boolean;
  allowVoiceStorage: boolean;
}

export interface UserProfile {
  id: string;
  displayName: string;
  preferredHonorific?: string;
  role: UserRole;
  age: number;
  avatarUrl: string;
  preferredLanguage: SupportedLanguage;
  relationshipToCaregiver?: string;
  caregiverName?: string;
  primaryLocation?: string;
  accessibilityPreferences: AccessibilityPreferences;
  consentSettings: ConsentSettings;
  createdAt: string;
}

export type MemoryCategory =
  | 'Photos'
  | 'Voices'
  | 'People'
  | 'Places'
  | 'Stories'
  | 'Daily Life'
  | 'Festivals'
  | 'Special Moments';

export interface RelatedPerson {
  name: string;
  relationship: string;
  nickname?: string;
}

export interface Memory {
  id: string;
  ownerId: string;
  title: string;
  category: MemoryCategory;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'audio';
  relatedPeople: RelatedPerson[];
  place: string;
  eventDate?: string;
  audioVoiceNoteUrl?: string;
  audioVoiceNoteDuration?: string;
  emotionalTag?: string;
  keyPromptQuestion?: string;
  verifiedByCaregiver: boolean;
  isFavorite?: boolean;
  createdAt: string;
}

export type ActivityType =
  | 'photo_recall'
  | 'object_match'
  | 'story_builder'
  | 'daily_routine';

export interface ActivityTask {
  id: string;
  question: string;
  audioPrompt?: string;
  imageUrl?: string;
  options: {
    id: string;
    label: string;
    isCorrect: boolean;
    feedbackMessage: string;
  }[];
  hint?: string;
}

export interface ActivitySession {
  id: string;
  profileId: string;
  activityType: ActivityType;
  activityTitle: string;
  startTime: string;
  completionTime: string;
  taskCount: number;
  correctResponses: number;
  hintsUsed: number;
  userSatisfaction?: 'joyful' | 'calm' | 'tired';
  engagementNotes: string;
  completedOffline?: boolean;
}

export interface CaregiverNote {
  id: string;
  profileId: string;
  authorId: string;
  authorName: string;
  category: 'Observation' | 'Routine' | 'Mood' | 'Reminder';
  note: string;
  createdAt: string;
}

export interface CareRecommendation {
  id: string;
  profileId: string;
  activityType?: ActivityType;
  title: string;
  reason: string;
  priority: 'gentle' | 'helpful' | 'recommended';
  status: 'active' | 'dismissed';
  createdAt: string;
}

export interface CareTagDevice {
  connected: boolean;
  batteryLevel: number;
  lastSyncTime: string;
  wearingState: 'wearing' | 'charging' | 'idle';
  firmwareVersion: string;
  deviceSerialNumber: string;
}
