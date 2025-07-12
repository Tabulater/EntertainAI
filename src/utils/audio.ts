class AudioManager {
  private backgroundAudio: HTMLAudioElement | null = null;
  private currentBackgroundSrc: string | null = null;
  private speechSynthesis: SpeechSynthesis;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    this.speechSynthesis = window.speechSynthesis;
  }

  async playBackgroundMusic(src: string, loop: boolean = true): Promise<void> {
    // Check if the same audio is already playing and not paused
    if (this.currentBackgroundSrc === src && this.backgroundAudio && !this.backgroundAudio.paused) {
      return;
    }
    
    this.stopBackgroundMusic();
    
    return new Promise((resolve, reject) => {
      this.backgroundAudio = new Audio(src);
      this.currentBackgroundSrc = src;
      this.backgroundAudio.loop = loop;
      this.backgroundAudio.volume = 0.3;
      
      this.backgroundAudio.addEventListener('canplaythrough', () => resolve());
      this.backgroundAudio.addEventListener('error', () => {
        this.currentBackgroundSrc = null;
        reject(new Error('Failed to load audio'));
      });
      
      this.backgroundAudio.play().catch(reject);
    });
  }

  stopBackgroundMusic(): void {
    if (this.backgroundAudio) {
      this.backgroundAudio.pause();
      this.backgroundAudio = null;
      this.currentBackgroundSrc = null;
    }
  }

  setBackgroundVolume(volume: number): void {
    if (this.backgroundAudio) {
      this.backgroundAudio.volume = Math.max(0, Math.min(1, volume));
    }
  }

  speakText(text: string, options: { rate?: number; pitch?: number; volume?: number } = {}): void {
    this.stopSpeaking();
    
    if (!text.trim()) return;
    
    this.currentUtterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance.rate = options.rate || 1;
    this.currentUtterance.pitch = options.pitch || 1;
    this.currentUtterance.volume = options.volume || 1;
    
    this.speechSynthesis.speak(this.currentUtterance);
  }

  stopSpeaking(): void {
    if (this.speechSynthesis.speaking) {
      this.speechSynthesis.cancel();
    }
    this.currentUtterance = null;
  }

  isSpeaking(): boolean {
    return this.speechSynthesis.speaking;
  }

  getVoices(): SpeechSynthesisVoice[] {
    return this.speechSynthesis.getVoices();
  }
}

export const audioManager = new AudioManager();