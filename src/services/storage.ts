import {
  UserProfile,
  Memory,
  ActivitySession,
  CaregiverNote,
  CareRecommendation,
  CareTagDevice
} from '../types';
import {
  DEFAULT_PROFILE,
  DEFAULT_MEMORIES,
  DEFAULT_SESSIONS,
  DEFAULT_CAREGIVER_NOTES,
  DEFAULT_RECOMMENDATIONS,
  DEFAULT_CARE_TAG
} from '../data/defaultData';

const STORAGE_KEYS = {
  PROFILE: 'smriti_profile_v1',
  MEMORIES: 'smriti_memories_v1',
  SESSIONS: 'smriti_sessions_v1',
  NOTES: 'smriti_notes_v1',
  RECOMMENDATIONS: 'smriti_recommendations_v1',
  CARE_TAG: 'smriti_caretag_v1',
  SIMULATE_OFFLINE: 'smriti_simulate_offline_v1'
};

export class StorageService {
  // Profile
  public static getProfile(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return data ? JSON.parse(data) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  }

  public static saveProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Error saving profile to localStorage', e);
    }
  }

  // Memories
  public static getMemories(): Memory[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MEMORIES);
      return data ? JSON.parse(data) : DEFAULT_MEMORIES;
    } catch {
      return DEFAULT_MEMORIES;
    }
  }

  public static saveMemories(memories: Memory[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.MEMORIES, JSON.stringify(memories));
    } catch (e) {
      console.error('Error saving memories', e);
    }
  }

  public static addMemory(memory: Omit<Memory, 'id' | 'createdAt'>): Memory {
    const list = this.getMemories();
    const newMem: Memory = {
      ...memory,
      id: `mem_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString()
    };
    list.unshift(newMem);
    this.saveMemories(list);
    return newMem;
  }

  public static updateMemory(updated: Memory): void {
    const list = this.getMemories().map(m => m.id === updated.id ? updated : m);
    this.saveMemories(list);
  }

  public static deleteMemory(id: string): void {
    const list = this.getMemories().filter(m => m.id !== id);
    this.saveMemories(list);
  }

  // Activity Sessions
  public static getSessions(): ActivitySession[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      return data ? JSON.parse(data) : DEFAULT_SESSIONS;
    } catch {
      return DEFAULT_SESSIONS;
    }
  }

  public static recordSession(session: Omit<ActivitySession, 'id'>): ActivitySession {
    const list = this.getSessions();
    const newSession: ActivitySession = {
      ...session,
      id: `sess_${Date.now()}`
    };
    list.unshift(newSession);
    try {
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(list));
    } catch (e) {
      console.error('Error recording session', e);
    }
    return newSession;
  }

  // Caregiver Notes
  public static getNotes(): CaregiverNote[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NOTES);
      return data ? JSON.parse(data) : DEFAULT_CAREGIVER_NOTES;
    } catch {
      return DEFAULT_CAREGIVER_NOTES;
    }
  }

  public static addNote(note: Omit<CaregiverNote, 'id' | 'createdAt'>): CaregiverNote {
    const list = this.getNotes();
    const newNote: CaregiverNote = {
      ...note,
      id: `note_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    list.unshift(newNote);
    try {
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(list));
    } catch (e) {
      console.error('Error saving note', e);
    }
    return newNote;
  }

  public static deleteNote(id: string): void {
    const list = this.getNotes().filter(n => n.id !== id);
    try {
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(list));
    } catch (e) {
      console.error('Error deleting note', e);
    }
  }

  // Care Recommendations
  public static getRecommendations(): CareRecommendation[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RECOMMENDATIONS);
      return data ? JSON.parse(data) : DEFAULT_RECOMMENDATIONS;
    } catch {
      return DEFAULT_RECOMMENDATIONS;
    }
  }

  public static dismissRecommendation(id: string): void {
    const list = this.getRecommendations().map(r => r.id === id ? { ...r, status: 'dismissed' as const } : r);
    try {
      localStorage.setItem(STORAGE_KEYS.RECOMMENDATIONS, JSON.stringify(list));
    } catch (e) {
      console.error('Error dismissing recommendation', e);
    }
  }

  // Care Tag Device
  public static getCareTag(): CareTagDevice {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CARE_TAG);
      return data ? JSON.parse(data) : DEFAULT_CARE_TAG;
    } catch {
      return DEFAULT_CARE_TAG;
    }
  }

  public static saveCareTag(device: CareTagDevice): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CARE_TAG, JSON.stringify(device));
    } catch (e) {
      console.error('Error saving care tag state', e);
    }
  }

  // Offline Simulation
  public static isOfflineSimulated(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEYS.SIMULATE_OFFLINE) === 'true';
    } catch {
      return false;
    }
  }

  public static setSimulateOffline(val: boolean): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SIMULATE_OFFLINE, val ? 'true' : 'false');
    } catch {
      // ignore
    }
  }

  // Reset to sample state
  public static resetToDemo(): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(DEFAULT_PROFILE));
      localStorage.setItem(STORAGE_KEYS.MEMORIES, JSON.stringify(DEFAULT_MEMORIES));
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(DEFAULT_SESSIONS));
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(DEFAULT_CAREGIVER_NOTES));
      localStorage.setItem(STORAGE_KEYS.RECOMMENDATIONS, JSON.stringify(DEFAULT_RECOMMENDATIONS));
      localStorage.setItem(STORAGE_KEYS.CARE_TAG, JSON.stringify(DEFAULT_CARE_TAG));
      localStorage.removeItem(STORAGE_KEYS.SIMULATE_OFFLINE);
    } catch (e) {
      console.error('Error resetting to demo', e);
    }
  }
}
