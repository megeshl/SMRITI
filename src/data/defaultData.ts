import { UserProfile, Memory, ActivitySession, CaregiverNote, CareRecommendation, CareTagDevice } from '../types';

export const DEFAULT_PROFILE: UserProfile = {
  id: 'profile_lakshmi_amma',
  displayName: 'Lakshmi Amma',
  preferredHonorific: 'Amma',
  role: 'elderly',
  age: 72,
  avatarUrl: '/src/assets/images/welcome_lakshmi_nature_1791906008255.jpg',
  preferredLanguage: 'en',
  relationshipToCaregiver: 'Mother',
  caregiverName: 'Priya Ramanathan (Daughter)',
  primaryLocation: 'Mylapore, Chennai',
  accessibilityPreferences: {
    fontSize: 'large',
    highContrast: false,
    spokenAudio: true,
    simpleMode: false,
    reduceMotion: false
  },
  consentSettings: {
    shareWithCaregiver: true,
    shareAnonymousPatterns: false,
    allowVoiceStorage: true
  },
  createdAt: '2026-09-01T09:00:00Z'
};

export const DEFAULT_MEMORIES: Memory[] = [
  {
    id: 'mem_diwali_family',
    ownerId: 'profile_lakshmi_amma',
    title: 'Deepavali Gathering with Priya & Aarav',
    category: 'Festivals',
    description: 'Lighting the auspicious brass diya together in the living room. Aarav was laughing while wearing his new silk kurta, and Priya brought hot freshly made Mysore Pak sweets.',
    mediaUrl: '/src/assets/images/memory_family_festive_1791906009099.jpg',
    mediaType: 'image',
    relatedPeople: [
      { name: 'Priya', relationship: 'Daughter' },
      { name: 'Aarav', relationship: 'Grandson' }
    ],
    place: 'Home living room, Chennai',
    eventDate: 'November 2024',
    emotionalTag: 'Joyful & Tender',
    keyPromptQuestion: 'Who is holding the glowing diya lamp with you?',
    verifiedByCaregiver: true,
    isFavorite: true,
    audioVoiceNoteDuration: '0:34',
    createdAt: '2026-09-02T10:30:00Z'
  },
  {
    id: 'mem_morning_coffee',
    ownerId: 'profile_lakshmi_amma',
    title: 'Morning Filter Coffee & Fresh Jasmines',
    category: 'Daily Life',
    description: 'The aroma of dark chicory filter coffee brewed at 6:30 AM in the brass davarah-tumbler, alongside a fresh string of Madurai malli flowers bought from the morning vendor.',
    mediaUrl: '/src/assets/images/memory_morning_tea_1791906009984.jpg',
    mediaType: 'image',
    relatedPeople: [],
    place: 'Veranda table, Mylapore',
    eventDate: 'Every morning routine',
    emotionalTag: 'Calm & Comforting',
    keyPromptQuestion: 'What comforting morning drink is in this traditional brass tumbler?',
    verifiedByCaregiver: true,
    isFavorite: true,
    audioVoiceNoteDuration: '0:22',
    createdAt: '2026-09-03T07:15:00Z'
  },
  {
    id: 'mem_kapaleeshwarar_walk',
    ownerId: 'profile_lakshmi_amma',
    title: 'Temple Lotus Tank Dawn Walk',
    category: 'Places',
    description: 'The ancient stone steps of the sacred temple tank at sunrise. Cool morning breeze, the soft temple bells chanting Suprabhatam, and peaceful reflections in the water.',
    mediaUrl: '/src/assets/images/memory_temple_garden_1791906010869.jpg',
    mediaType: 'image',
    relatedPeople: [
      { name: 'Srinivasan', relationship: 'Husband (Beloved memory)' }
    ],
    place: 'Kapaleeshwarar Temple Tank, Mylapore',
    eventDate: 'Favorite morning sanctuary',
    emotionalTag: 'Serene & Reverent',
    keyPromptQuestion: 'Which serene temple courtyard tank do you love walking around at dawn?',
    verifiedByCaregiver: true,
    isFavorite: true,
    createdAt: '2026-09-05T06:45:00Z'
  },
  {
    id: 'mem_tulsi_morning_care',
    ownerId: 'profile_lakshmi_amma',
    title: 'Watering the Sacred Tulsi Brindavan',
    category: 'Daily Life',
    description: 'Offering fresh well water to the sacred Tulsi plant in the clay planter every morning, placing fresh marigold flowers and chanting quiet peace prayers for the family.',
    mediaUrl: '/src/assets/images/memory_tulsi_plant_1791906010657.jpg',
    mediaType: 'image',
    relatedPeople: [],
    place: 'Sunny Courtyard Veranda',
    eventDate: 'Daily morning worship',
    emotionalTag: 'Peaceful & Devotional',
    keyPromptQuestion: 'What sacred plant do you gently water on the veranda every dawn?',
    verifiedByCaregiver: true,
    isFavorite: false,
    createdAt: '2026-09-06T07:00:00Z'
  },
  {
    id: 'mem_courtyard_resting',
    ownerId: 'profile_lakshmi_amma',
    title: 'Quiet Afternoon in the Veranda Armchair',
    category: 'Stories',
    description: 'Sitting in the antique wooden planter chair in the shaded garden veranda, listening to the afternoon bulbuls singing in the hibiscus bushes while knitting wool.',
    mediaUrl: '/src/assets/images/welcome_lakshmi_nature_1791906008255.jpg',
    mediaType: 'image',
    relatedPeople: [],
    place: 'Home ancestral garden',
    eventDate: 'Quiet afternoons',
    emotionalTag: 'Nostalgic & Content',
    keyPromptQuestion: 'Where do you enjoy sitting to watch the garden birds in the afternoon?',
    verifiedByCaregiver: true,
    isFavorite: true,
    createdAt: '2026-09-08T15:20:00Z'
  }
];

export const DEFAULT_SESSIONS: ActivitySession[] = [
  {
    id: 'sess_101',
    profileId: 'profile_lakshmi_amma',
    activityType: 'photo_recall',
    activityTitle: 'Family Photo Recall',
    startTime: '2026-10-12T10:15:00Z',
    completionTime: '2026-10-12T10:21:00Z',
    taskCount: 3,
    correctResponses: 3,
    hintsUsed: 0,
    userSatisfaction: 'joyful',
    engagementNotes: 'Smiled warmly when recognizing Aarav and Priya lighting the Diwali lamp. Read questions with delight.'
  },
  {
    id: 'sess_102',
    profileId: 'profile_lakshmi_amma',
    activityType: 'daily_routine',
    activityTitle: 'Morning Garden & Tea Routine',
    startTime: '2026-10-11T09:40:00Z',
    completionTime: '2026-10-11T09:47:00Z',
    taskCount: 4,
    correctResponses: 4,
    hintsUsed: 1,
    userSatisfaction: 'calm',
    engagementNotes: 'Sequenced morning filter coffee and watering the Tulsi plant smoothly after listening to audio hint.'
  },
  {
    id: 'sess_103',
    profileId: 'profile_lakshmi_amma',
    activityType: 'object_match',
    activityTitle: 'Everyday Household Objects',
    startTime: '2026-10-10T16:00:00Z',
    completionTime: '2026-10-10T16:08:00Z',
    taskCount: 3,
    correctResponses: 3,
    hintsUsed: 0,
    userSatisfaction: 'calm',
    engagementNotes: 'Matched brass coffee tumbler and jasmine garland instantly with enthusiastic conversation.'
  },
  {
    id: 'sess_104',
    profileId: 'profile_lakshmi_amma',
    activityType: 'story_builder',
    activityTitle: 'Diwali Evening Story Builder',
    startTime: '2026-10-09T11:20:00Z',
    completionTime: '2026-10-09T11:29:00Z',
    taskCount: 4,
    correctResponses: 3,
    hintsUsed: 1,
    userSatisfaction: 'joyful',
    engagementNotes: 'Arranged family celebration steps with genuine laughter while reminiscing about Aarav sweets.'
  },
  {
    id: 'sess_105',
    profileId: 'profile_lakshmi_amma',
    activityType: 'photo_recall',
    activityTitle: 'Places You Love — Temple Tank',
    startTime: '2026-10-08T10:00:00Z',
    completionTime: '2026-10-08T10:07:00Z',
    taskCount: 3,
    correctResponses: 3,
    hintsUsed: 0,
    userSatisfaction: 'calm',
    engagementNotes: 'Recognized Kapaleeshwarar tank instantly and mentioned how she walked there with Srinivasan.'
  }
];

export const DEFAULT_CAREGIVER_NOTES: CaregiverNote[] = [
  {
    id: 'note_1',
    profileId: 'profile_lakshmi_amma',
    authorId: 'user_priya',
    authorName: 'Priya Ramanathan (Daughter)',
    category: 'Observation',
    note: 'Amma was extremely cheerful after doing the Photo Recall game today. She started telling stories about when we visited Madurai and requested we make filter coffee together.',
    createdAt: '2026-10-12T11:00:00Z'
  },
  {
    id: 'note_2',
    profileId: 'profile_lakshmi_amma',
    authorId: 'user_priya',
    authorName: 'Priya Ramanathan (Daughter)',
    category: 'Routine',
    note: 'Spoken audio instructions are very reassuring for her in the mornings. Keep speaker mode on so she doesn’t strain her eyes.',
    createdAt: '2026-10-10T17:30:00Z'
  },
  {
    id: 'note_3',
    profileId: 'profile_lakshmi_amma',
    authorId: 'user_priya',
    authorName: 'Priya Ramanathan (Daughter)',
    category: 'Reminder',
    note: 'Uploaded three new photos from our wedding anniversary album. Will walk through them with Amma this weekend.',
    createdAt: '2026-10-08T19:15:00Z'
  }
];

export const DEFAULT_RECOMMENDATIONS: CareRecommendation[] = [
  {
    id: 'rec_1',
    profileId: 'profile_lakshmi_amma',
    activityType: 'photo_recall',
    title: 'Continue familiar photo-based activities',
    reason: 'Lakshmi Amma shows high joy and zero hesitation during family photo recognition. Highly recommended for morning sessions.',
    priority: 'recommended',
    status: 'active',
    createdAt: '2026-10-12T08:00:00Z'
  },
  {
    id: 'rec_2',
    profileId: 'profile_lakshmi_amma',
    activityType: 'daily_routine',
    title: 'Keep routine-sequencing activities under 4 steps',
    reason: 'Morning sequencing was completed with ease when kept to 3–4 familiar daily steps with audio hints available.',
    priority: 'helpful',
    status: 'active',
    createdAt: '2026-10-11T12:00:00Z'
  },
  {
    id: 'rec_3',
    profileId: 'profile_lakshmi_amma',
    activityType: 'story_builder',
    title: 'Add more audio voice notes from family members',
    reason: 'Voice cues significantly deepen emotional presence and stimulate cheerful verbal engagement.',
    priority: 'gentle',
    status: 'active',
    createdAt: '2026-10-09T14:30:00Z'
  }
];

export const DEFAULT_CARE_TAG: CareTagDevice = {
  connected: true,
  batteryLevel: 86,
  lastSyncTime: '12 minutes ago',
  wearingState: 'wearing',
  firmwareVersion: 'SMRITI-TAG-v1.4.2-BLE',
  deviceSerialNumber: 'SMT-2026-8849-IN'
};
