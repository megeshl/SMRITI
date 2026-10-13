import { SupportedLanguage } from '../types';

/**
 * Text-to-speech service with graceful fallback and elderly-friendly pacing.
 */
class SpeechService {
  private isSupported: boolean;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    this.isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public speak(text: string, lang: SupportedLanguage = 'en', onEnd?: () => void) {
    if (!this.isSupported) {
      if (onEnd) setTimeout(onEnd, 1500);
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.88; // Gentle, slower pace suited for elderly listening
      utterance.pitch = 1.0;

      // Select matching voice if available
      const langCodes: Record<SupportedLanguage, string> = {
        en: 'en-US',
        ta: 'ta-IN',
        hi: 'hi-IN',
        as: 'as-IN'
      };

      utterance.lang = langCodes[lang] || 'en-US';

      utterance.onend = () => {
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch {
      if (onEnd) onEnd();
    }
  }

  public stop() {
    if (this.isSupported) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
  }

  public checkSupport(): boolean {
    return this.isSupported;
  }
}

export const speechService = new SpeechService();
