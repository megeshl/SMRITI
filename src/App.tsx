/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  UserProfile,
  Memory,
  ActivitySession,
  CaregiverNote,
  CareRecommendation,
  CareTagDevice,
  SupportedLanguage,
  UserRole,
  ActivityType
} from './types';
import { StorageService } from './services/storage';
import { Sidebar, NavTab } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { AccessibilityBar } from './components/AccessibilityBar';
import { BottomNav } from './components/BottomNav';
import { WelcomeView } from './views/WelcomeView';
import { ElderlyDashboardView } from './views/ElderlyDashboardView';
import { MemoryUniverseView } from './views/MemoryUniverseView';
import { AddEditMemoryModal } from './views/AddEditMemoryModal';
import { CognitiveGamesView } from './views/CognitiveGamesView';
import { MyProgressView } from './views/MyProgressView';
import { CarePulseView } from './views/CarePulseView';
import { CareTagConceptView } from './views/CareTagConceptView';
import { SettingsView } from './views/SettingsView';

export default function App() {
  // State Initialization from Persistent Local Storage
  const [profile, setProfile] = useState<UserProfile>(() => StorageService.getProfile());
  const [memories, setMemories] = useState<Memory[]>(() => StorageService.getMemories());
  const [sessions, setSessions] = useState<ActivitySession[]>(() => StorageService.getSessions());
  const [notes, setNotes] = useState<CaregiverNote[]>(() => StorageService.getNotes());
  const [recommendations, setRecommendations] = useState<CareRecommendation[]>(() =>
    StorageService.getRecommendations()
  );
  const [careTag, setCareTag] = useState<CareTagDevice>(() => StorageService.getCareTag());
  const [isSimulatedOffline, setIsSimulatedOffline] = useState<boolean>(() =>
    StorageService.isOfflineSimulated()
  );

  // Navigation & Modal State
  const [showWelcome, setShowWelcome] = useState<boolean>(() => {
    // If user already initialized, start directly in app; otherwise show welcome
    return false;
  });
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [activeGame, setActiveGame] = useState<ActivityType | null>(null);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editingMemory, setEditingMemory] = useState<Memory | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Apply Accessibility Classes to Body
  useEffect(() => {
    const body = document.body;
    if (profile.accessibilityPreferences.highContrast) {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }

    if (profile.accessibilityPreferences.simpleMode) {
      body.classList.add('simple-mode');
    } else {
      body.classList.remove('simple-mode');
    }

    // Font size scaling
    body.classList.remove('text-sm', 'text-base', 'text-lg');
    if (profile.accessibilityPreferences.fontSize === 'large') {
      body.classList.add('text-base');
    } else if (profile.accessibilityPreferences.fontSize === 'xlarge') {
      body.classList.add('text-lg');
    } else {
      body.classList.add('text-sm');
    }
  }, [profile.accessibilityPreferences]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Language change handler
  const handleLanguageChange = (lang: SupportedLanguage) => {
    const updated = { ...profile, preferredLanguage: lang };
    setProfile(updated);
    StorageService.saveProfile(updated);
  };

  // Accessibility preferences handler
  const handleUpdatePreferences = (
    prefs: Partial<UserProfile['accessibilityPreferences']>
  ) => {
    const updated = {
      ...profile,
      accessibilityPreferences: {
        ...profile.accessibilityPreferences,
        ...prefs
      }
    };
    setProfile(updated);
    StorageService.saveProfile(updated);
  };

  // Role toggle
  const handleToggleRole = () => {
    const nextRole: UserRole = profile.role === 'elderly' ? 'caregiver' : 'elderly';
    const updated = { ...profile, role: nextRole };
    setProfile(updated);
    StorageService.saveProfile(updated);
    showToast(`Switched to ${nextRole === 'elderly' ? 'Elderly User' : 'Caregiver'} View`);
    if (nextRole === 'caregiver') {
      setActiveTab('carepulse');
    } else {
      setActiveTab('home');
    }
  };

  // Offline simulation toggle
  const handleToggleOffline = () => {
    const next = !isSimulatedOffline;
    setIsSimulatedOffline(next);
    StorageService.setSimulateOffline(next);
    showToast(next ? 'Simulated Offline Mode Enabled (Local Cache Active)' : 'Online Mode Restored & Synced');
  };

  // Memory Actions
  const handleSaveMemory = (
    memoryData: Omit<Memory, 'id' | 'createdAt'>,
    existingId?: string
  ) => {
    if (existingId) {
      const existing = memories.find(m => m.id === existingId);
      if (existing) {
        const updated: Memory = { ...existing, ...memoryData };
        StorageService.updateMemory(updated);
        setMemories(StorageService.getMemories());
        showToast('Memory updated successfully');
      }
    } else {
      const created = StorageService.addMemory(memoryData);
      setMemories(StorageService.getMemories());
      showToast('New personal memory added to Memory Universe');
    }
  };

  const handleDeleteMemory = (id: string) => {
    StorageService.deleteMemory(id);
    setMemories(StorageService.getMemories());
    showToast('Memory removed');
  };

  // Game completion
  const handleSaveSession = (sessionData: Omit<ActivitySession, 'id'>) => {
    const recorded = StorageService.recordSession(sessionData);
    setSessions(StorageService.getSessions());
    setActiveGame(null);
    showToast('Activity completed and recorded in progress history');
    setActiveTab('home');
  };

  // Caregiver Note Actions
  const handleAddNote = (noteData: Omit<CaregiverNote, 'id' | 'createdAt'>) => {
    StorageService.addNote(noteData);
    setNotes(StorageService.getNotes());
    showToast('Caregiver note added');
  };

  const handleDeleteNote = (id: string) => {
    StorageService.deleteNote(id);
    setNotes(StorageService.getNotes());
    showToast('Caregiver note removed');
  };

  // Dismiss Recommendation
  const handleDismissRecommendation = (id: string) => {
    StorageService.dismissRecommendation(id);
    setRecommendations(StorageService.getRecommendations());
  };

  // Update Care Tag
  const handleUpdateCareTag = (device: CareTagDevice) => {
    StorageService.saveCareTag(device);
    setCareTag(device);
    showToast('Care Tag status synchronized');
  };

  // Reset Demo
  const handleResetDemo = () => {
    StorageService.resetToDemo();
    setProfile(StorageService.getProfile());
    setMemories(StorageService.getMemories());
    setSessions(StorageService.getSessions());
    setNotes(StorageService.getNotes());
    setRecommendations(StorageService.getRecommendations());
    setCareTag(StorageService.getCareTag());
    setIsSimulatedOffline(false);
    setActiveTab('home');
    setActiveGame(null);
    showToast('Reset to Lakshmi Amma demonstration profile');
  };

  // Launch Today Focus
  const handleStartTodayFocus = () => {
    setActiveTab('games');
    setActiveGame('photo_recall');
  };

  if (showWelcome) {
    return (
      <WelcomeView
        currentLang={profile.preferredLanguage}
        onLanguageChange={handleLanguageChange}
        onStart={(role, lang) => {
          const updated = { ...profile, role, preferredLanguage: lang };
          setProfile(updated);
          StorageService.saveProfile(updated);
          setShowWelcome(false);
          if (role === 'caregiver') setActiveTab('carepulse');
          else setActiveTab('home');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF8EF] flex text-[#17324D] selection:bg-[#E5EFE7]">
      {/* Desktop / Tablet Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          activeTab={activeTab}
          onSelectTab={tab => {
            setActiveTab(tab);
            setActiveGame(null);
          }}
          profile={profile}
          currentLang={profile.preferredLanguage}
          onToggleRole={handleToggleRole}
        />
      </div>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Accessibility Bar */}
        <AccessibilityBar
          profile={profile}
          currentLang={profile.preferredLanguage}
          onLanguageChange={handleLanguageChange}
          onUpdatePreferences={handleUpdatePreferences}
          isSimulatedOffline={isSimulatedOffline}
          onToggleOffline={handleToggleOffline}
        />

        {/* Top Header */}
        <TopHeader
          activeTab={activeTab}
          onSelectTab={tab => {
            setActiveTab(tab);
            setActiveGame(null);
          }}
          profile={profile}
          currentLang={profile.preferredLanguage}
          onOpenAddMemory={() => {
            setEditingMemory(null);
            setIsAddEditModalOpen(true);
          }}
          onStartTodayFocus={handleStartTodayFocus}
          onResetDemo={handleResetDemo}
        />

        {/* View Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {activeTab === 'home' && (
            <ElderlyDashboardView
              profile={profile}
              memories={memories}
              currentLang={profile.preferredLanguage}
              onLaunchGame={gameType => {
                setActiveTab('games');
                setActiveGame(gameType);
              }}
              onNavigateToMemories={() => setActiveTab('memories')}
              onNavigateToProgress={() => setActiveTab('progress')}
            />
          )}

          {activeTab === 'memories' && (
            <MemoryUniverseView
              memories={memories}
              currentLang={profile.preferredLanguage}
              onOpenAddModal={() => {
                setEditingMemory(null);
                setIsAddEditModalOpen(true);
              }}
              onOpenEditModal={memory => {
                setEditingMemory(memory);
                setIsAddEditModalOpen(true);
              }}
              onDeleteMemory={handleDeleteMemory}
            />
          )}

          {activeTab === 'games' && (
            <CognitiveGamesView
              memories={memories}
              currentLang={profile.preferredLanguage}
              activeGame={activeGame}
              onLaunchGame={game => setActiveGame(game)}
              onCloseGame={() => setActiveGame(null)}
              onSaveSession={handleSaveSession}
            />
          )}

          {activeTab === 'progress' && (
            <MyProgressView
              sessions={sessions}
              currentLang={profile.preferredLanguage}
            />
          )}

          {activeTab === 'carepulse' && (
            <CarePulseView
              profile={profile}
              sessions={sessions}
              notes={notes}
              recommendations={recommendations}
              currentLang={profile.preferredLanguage}
              onAddNote={handleAddNote}
              onDeleteNote={handleDeleteNote}
              onDismissRecommendation={handleDismissRecommendation}
            />
          )}

          {activeTab === 'caretag' && (
            <CareTagConceptView
              careTag={careTag}
              currentLang={profile.preferredLanguage}
              onUpdateCareTag={handleUpdateCareTag}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              profile={profile}
              currentLang={profile.preferredLanguage}
              onUpdateProfile={p => {
                setProfile(p);
                StorageService.saveProfile(p);
                showToast('Profile and preferences updated');
              }}
              onResetDemo={handleResetDemo}
              onLanguageChange={handleLanguageChange}
            />
          )}
        </main>

        {/* Mobile Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          onSelectTab={tab => {
            setActiveTab(tab);
            setActiveGame(null);
          }}
          currentLang={profile.preferredLanguage}
        />
      </div>

      {/* Add / Edit Memory Modal */}
      <AddEditMemoryModal
        isOpen={isAddEditModalOpen}
        memoryToEdit={editingMemory}
        onClose={() => {
          setIsAddEditModalOpen(false);
          setEditingMemory(null);
        }}
        onSave={handleSaveMemory}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-16 sm:bottom-6 right-6 z-50 bg-[#17324D] text-white text-xs font-semibold py-3 px-5 rounded-2xl shadow-xl border border-[#167D83]/40 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3"
        >
          <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
